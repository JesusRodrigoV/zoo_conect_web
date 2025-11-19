import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SplitterLayout } from "../../components/splitter-layout";
import { MainContainer } from "@app/shared/components/main-container";
import { NavMenuGestion } from "../../components/nav-menu-gestion";
import { RouterOutlet } from "@angular/router";
import { MenuButton } from "../../models";

@Component({
  selector: "app-gestion-inventario",
  imports: [SplitterLayout, MainContainer, NavMenuGestion, RouterOutlet],
  templateUrl: "./gestion-inventario.html",
  styleUrl: "./gestion-inventario.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionInventario {
  protected readonly buttons: MenuButton[] = [
    {
      icono: "pi pi-user-plus",
      texto: "Creaasdfasdfasdf",
      descripcion: "Agregar nuevo usuario al sistema",
      ruta: "/admin/usuarios/crear",
      exacto: false,
    },
    {
      icono: "pi pi-users",
      texto: "Lista de Usuariosasfasdfasd",
      descripcion: "Ver y gestionar usuarios existentes",
      ruta: "/admin/usuarios",
      exacto: true,
    },
  ];
}
