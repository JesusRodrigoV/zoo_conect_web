import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  computed,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { Loader } from "@app/shared/components";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DataViewModule } from "primeng/dataview";
import { PaginatorModule } from "primeng/paginator";
import { SelectButtonModule } from "primeng/selectbutton";
import { InputTextModule } from "primeng/inputtext";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { ConfirmationService } from "primeng/api";
import { DietaItem } from "../dieta-item";
import { AlimentacionStore } from "../../../stores/alimentacion.store";

@Component({
  selector: "app-lista-dietas",
  imports: [
    DataViewModule,
    ButtonModule,
    SelectButtonModule,
    PaginatorModule,
    ConfirmDialogModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    RouterLink,
    FormsModule,
    Loader,
    DietaItem,
  ],
  templateUrl: "./lista-dietas.html",
  styleUrl: "../../../lista-styles.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export default class ListaDietas implements OnInit {
  readonly store = inject(AlimentacionStore);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);

  layout: "list" | "grid" = "list";
  searchTerm = signal("");

  layoutOptions = [
    { icon: "pi pi-list", value: "list" },
    { icon: "pi pi-table", value: "grid" },
  ];

  ngOnInit() {
    this.store.loadDietas();
  }

  onSearch() {
    this.store.setPage(1, this.store.size());
  }

  clearSearch() {
    this.searchTerm.set("");
    this.onSearch();
  }

  onPageChange(event: any) {
    const page = event.first / event.rows + 1;
    this.store.setPage(page, event.rows);
  }

  confirmDelete(id: number) {
    this.confirmationService.confirm({
      message:
        "¿Estás seguro de eliminar esta dieta? Esto afectará a los animales asignados.",
      header: "Confirmar Baja",
      icon: "pi pi-exclamation-triangle",
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.store.deleteDieta(id);
      },
    });
  }

  editDieta(id: number) {
    this.router.navigate(["/vet/dietas/editar", id]);
  }

  viewDieta(id: number) {
    console.log("Ver detalle", id);
  }
}
