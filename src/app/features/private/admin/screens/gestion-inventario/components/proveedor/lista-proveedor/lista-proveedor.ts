import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { Loader } from "@app/shared/components";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DataViewModule } from "primeng/dataview";
import { PaginatorModule } from "primeng/paginator";
import { SelectButtonModule } from "primeng/selectbutton";
import { ProveedorItem } from "../proveedor-item/proveedor-item";
import { ProveedoresStore } from "@app/features/private/admin/stores/admin-proveedores.store";
import { ConfirmationService } from "primeng/api";

@Component({
  selector: "app-lista-proveedor",
  imports: [
    DataViewModule,
    ButtonModule,
    SelectButtonModule,
    PaginatorModule,
    ConfirmDialogModule,
    RouterLink,
    FormsModule,
    Loader,
    ProveedorItem,
  ],
  templateUrl: "./lista-proveedor.html",
  styleUrl: "../../../../lista-styles.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export default class ListaProveedor implements OnInit {
  readonly store = inject(ProveedoresStore);
  readonly router = inject(Router);

  private confirmationService = inject(ConfirmationService);

  layout: "list" | "grid" = "list";
  layoutOptions = [
    { icon: "pi pi-list", value: "list" },
    { icon: "pi pi-table", value: "grid" },
  ];

  ngOnInit() {
    this.store.loadItems();
  }

  onPageChange(event: any) {
    const page = event.first / event.rows + 1;
    this.store.setPage(page, event.rows);
  }

  confirmDelete(id: number) {
    this.confirmationService.confirm({
      message: "¿Estás seguro de eliminar este proveedor?",
      header: "Confirmar Baja",
      icon: "pi pi-exclamation-triangle",
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.store.deleteItem(id);
      },
    });
  }

  editProveedor(id: number) {
    this.router.navigate(["admin/inventario/proveedor/editar", id]);
  }
}
