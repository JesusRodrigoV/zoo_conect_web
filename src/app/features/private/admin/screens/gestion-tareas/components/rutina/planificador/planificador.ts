import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { TooltipModule } from "primeng/tooltip";
import { RecurrentesStore } from "@app/features/private/admin/stores/tareas/admin-recurrentes.store";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TagModule } from "primeng/tag";
import { ConfirmationService, MessageService } from "primeng/api";
import { TareaRecurrente } from "@app/features/private/admin/models/tareas/tarea.model";
import { CrearRutina } from "../crear-rutina";
import { RutinaItem } from "../rutina-item";
import { ZooConfirmationService } from "@app/shared/services/zoo-confirmation-service";

@Component({
  selector: "app-planificador",
  imports: [
    ButtonModule,
    TableModule,
    TagModule,
    TooltipModule,
    ConfirmDialogModule,
    CrearRutina,
    RutinaItem,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: "./planificador.html",
  styleUrl: "./planificador.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Planificador {
  readonly store = inject(RecurrentesStore);
  private readonly confirm = inject(ZooConfirmationService);

  modalVisible = signal(false);
  editingItem = signal<TareaRecurrente | null>(null);

  ngOnInit() {
    this.store.loadItems();
  }

  openCreateModal() {
    this.editingItem.set(null);
    this.modalVisible.set(true);
  }

  onPageChange(event: any) {
    const page = (event.first ?? 0) / (event.rows ?? 10) + 1;
    const size = event.rows ?? 10;
    this.store.setPage(page, size);
  }
  openEditModal(item: TareaRecurrente) {
    this.editingItem.set(item);
    this.modalVisible.set(true);
  }

  deleteItem(id: number) {
    this.confirm.delete({
      message:
        "¿Estás seguro de eliminar esta rutina permanente? Dejará de generarse en el futuro.",
      accept: () => this.store.deleteItem(id),
    });
  }

  getSeverity(active: boolean) {
    return active ? "success" : "secondary";
  }

  getStatusText(active: boolean) {
    return active ? "Activa" : "Pausada";
  }
}
