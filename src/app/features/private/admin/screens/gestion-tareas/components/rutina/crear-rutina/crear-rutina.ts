import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { TextareaModule } from "primeng/textarea";
import { SelectModule } from "primeng/select";
import { ToggleSwitchModule } from "primeng/toggleswitch";
import { TooltipModule } from "primeng/tooltip";
import {
  CreateTareaRecurrente,
  TareaRecurrente,
} from "@app/features/private/admin/models/tareas/tarea.model";
import { ShowToast } from "@app/shared/services";
import { RecurrentesStore } from "@app/features/private/admin/stores/tareas/admin-recurrentes.store";
import { TiposTareaStore } from "@app/features/private/admin/stores/tareas/admin-tipo-tares.store";
import { AdminAnimales } from "@app/features/private/admin/services/admin-animales";
import { AdminHabitat } from "@app/features/private/admin/services/admin-habitat";
import { ChipModule } from "primeng/chip";

interface LugarOption {
  label: string;
  value: number | null;
  tipo: "animal" | "habitat" | "general";
}
interface CronPreset {
  label: string;
  value: string;
}
@Component({
  selector: "zoo-crear-rutina",
  imports: [
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    ToggleSwitchModule,
    TooltipModule,
    ChipModule,
  ],
  templateUrl: "./crear-rutina.html",
  styleUrl: "./crear-rutina.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrearRutina {
  visible = input.required<boolean>();
  editingItem = input<TareaRecurrente | null>(null);

  onClose = output<void>();
  onSave = output<void>();

  private fb = inject(FormBuilder);
  private toast = inject(ShowToast);

  readonly store = inject(RecurrentesStore);
  readonly tiposStore = inject(TiposTareaStore);

  private animalesService = inject(AdminAnimales);
  private habitatService = inject(AdminHabitat);

  protected isLoadingData = signal(false);
  protected animales = signal<{ label: string; value: number }[]>([]);
  protected habitats = signal<{ label: string; value: number }[]>([]);

  protected lugares = computed<LugarOption[]>(() => [
    { label: "Todas las áreas (General)", value: null, tipo: "general" },
    ...this.animales().map((a) => ({
      label: `Animal: ${a.label}`,
      value: a.value,
      tipo: "animal" as const,
    })),
    ...this.habitats().map((h) => ({
      label: `Hábitat: ${h.label}`,
      value: h.value,
      tipo: "habitat" as const,
    })),
  ]);

  protected pageTitle = computed(() =>
    this.editingItem() ? "Editar Rutina" : "Nueva Rutina",
  );

  protected isProcessing = computed(() => this.store.isSaving());

  protected form = this.fb.group({
    titulo: ["", [Validators.required, Validators.minLength(3)]],
    descripcion: [""],
    tipoTareaId: [null as number | null, [Validators.required]],
    frecuenciaCron: ["", [Validators.required]],
    lugarSeleccionado: [null as LugarOption | null],
  });

  protected cronPresets = [
    { label: "Diario a las 8:00 AM", value: "0 8 * * *" },
    { label: "Diario a las 2:00 PM", value: "0 14 * * *" },
    { label: "Lunes a Viernes 9:00 AM", value: "0 9 * * 1-5" },
    { label: "Fines de semana 10:00 AM", value: "0 10 * * 6,0" },
    { label: "1ro de cada mes", value: "0 0 1 * *" },
  ];

  constructor() {
    effect(() => {
      if (this.visible()) {
        untracked(() => this.loadCatalogos());
      }
    });

    effect(() => {
      const isVisible = this.visible();
      const item = this.editingItem();
      const options = this.lugares();

      if (isVisible) {
        untracked(() => {
          if (item && options.length === 0) return;

          if (item) {
            let seleccion: LugarOption | undefined;

            if (item.animalId) {
              seleccion = options.find(
                (l) => l.value === item.animalId && l.tipo === "animal",
              );
            } else if (item.habitatId) {
              seleccion = options.find(
                (l) => l.value === item.habitatId && l.tipo === "habitat",
              );
            } else {
              seleccion = options.find((l) => l.tipo === "general");
            }

            this.form.patchValue({
              titulo: item.titulo,
              descripcion: item.descripcion,
              tipoTareaId: item.tipoTareaId,
              frecuenciaCron: item.frecuenciaCron,
              lugarSeleccionado: seleccion || null,
            });
          } else {
            const generalOption = options.find((l) => l.tipo === "general");
            this.form.reset();
            this.form.patchValue({ lugarSeleccionado: generalOption });
          }
        });
      }
    });
  }

  private loadCatalogos() {
    if (this.tiposStore.items().length > 0 && this.animales().length > 0)
      return;

    this.isLoadingData.set(true);
    this.tiposStore.loadItems();

    Promise.all([
      new Promise<void>((resolve) => {
        this.animalesService.getAllAnimals(1, 100).subscribe((res) => {
          this.animales.set(
            res.items.map((a) => ({ label: a.nombre, value: a.id_animal })),
          );
          resolve();
        });
      }),
      new Promise<void>((resolve) => {
        this.habitatService.getAllHabitats(1, 100).subscribe((res) => {
          this.habitats.set(
            res.items.map((h) => ({ label: h.nombre, value: h.id })),
          );
          resolve();
        });
      }),
    ]).finally(() => this.isLoadingData.set(false));
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const val = this.form.value;

    const seleccion = val.lugarSeleccionado;

    const data: CreateTareaRecurrente = {
      titulo: val.titulo!,
      descripcion: val.descripcion || "",
      tipoTareaId: val.tipoTareaId!,
      frecuenciaCron: val.frecuenciaCron!,
      isActive: this.editingItem()?.isActive ?? true,

      animalId: seleccion?.tipo === "animal" ? seleccion.value! : undefined,
      habitatId: seleccion?.tipo === "habitat" ? seleccion.value! : undefined,
    };

    if (this.editingItem()) {
      this.store.updateItem({ id: this.editingItem()!.id, data });
    } else {
      this.store.createItem(data);
    }

    this.onSave.emit();
    this.close();
  }

  close() {
    this.onClose.emit();
  }

  applyPreset(preset: CronPreset | null) {
    if (preset) {
      this.form.patchValue({
        frecuenciaCron: preset.value,
      });
    } else {
      this.form.patchValue({
        frecuenciaCron: "",
      });
    }
  }
}
