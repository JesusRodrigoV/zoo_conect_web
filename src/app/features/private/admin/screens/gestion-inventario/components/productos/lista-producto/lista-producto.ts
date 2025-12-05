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
import { ProductoItem } from "../producto-item";
import { ProductStore } from "@app/features/private/admin/stores/admin-productos.store";
import { ConfirmationService } from "primeng/api";
import { ShowToast } from "@app/shared/services";
import { ZooConfirmationService } from "@app/shared/services/zoo-confirmation-service";

@Component({
  selector: "app-lista-producto",
  imports: [
    DataViewModule,
    ButtonModule,
    SelectButtonModule,
    PaginatorModule,
    ConfirmDialogModule,
    RouterLink,
    FormsModule,
    Loader,
    ProductoItem,
  ],
  templateUrl: "./lista-producto.html",
  styleUrl: "../../../../lista-styles.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export default class ListaProducto implements OnInit {
  readonly store = inject(ProductStore);
  readonly router = inject(Router);

  private confirm = inject(ZooConfirmationService);
  private toast = inject(ShowToast);

  layoutOptions = [
    { icon: "pi pi-list", value: "list" },
    { icon: "pi pi-table", value: "grid" },
  ];

  ngOnInit() {
    this.store.loadProducts();
  }

  onPageChange(event: any) {
    const page = event.page + 1;
    this.store.setPage(page, event.rows);
  }

  confirmDelete(id: number, event?: Event) {
    this.confirm.delete({
      message: "¿Estás seguro de eliminar este producto del inventario?",
      accept: () => {
        this.store.deleteProduct(id);
        this.toast.showSuccess(
          "Confirmado",
          "Producto eliminado correctamente",
        );
      },
    });
  }

  editProduct(id: number) {
    this.router.navigate(["admin/inventario/editar", id]);
  }
}
