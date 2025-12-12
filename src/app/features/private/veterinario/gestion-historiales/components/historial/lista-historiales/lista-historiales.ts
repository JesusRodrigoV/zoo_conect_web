import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { TooltipModule } from "primeng/tooltip";
import { ToolbarModule } from "primeng/toolbar";
import { SelectModule } from "primeng/select";
import { HistorialItem } from "../historial-item/historial-item";
import { HistorialesListaStore } from "@app/features/private/veterinario/stores/historiales/historiales.store";

@Component({
  selector: "app-lista-historiales",
  imports: [
    FormsModule,
    RouterLink,
    TableModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    CheckboxModule,
    ToolbarModule,
    TooltipModule,
    HistorialItem,
  ],
  templateUrl: "./lista-historiales.html",
  styleUrl: "./lista-historiales.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListaHistoriales {
  readonly store = inject(HistorialesListaStore);
  private router = inject(Router);

  readonly estadoOptions = [
    { label: "Todos los estados", value: undefined },
    { label: "En Curso (Abierto)", value: true },
    { label: "Finalizado (Cerrado)", value: false },
  ];

  goToDetail(id: number) {
    this.router.navigate(["/vet/historiales/", id]);
  }

  onPageChange(event: any) {
    const page = event.first / event.rows + 1;
    this.store.updatePagination(page, event.rows);
  }

  onFilterEstado(value: boolean | undefined) {
    this.store.updateFilters({ estado: value });
  }

  onFilterSoloMios(checked: boolean) {
    this.store.updateFilters({ soloMios: checked });
  }

  onSearchAnimal(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    const animalId = val ? parseInt(val, 10) : undefined;
    this.store.updateFilters({ animalId });
  }
}
