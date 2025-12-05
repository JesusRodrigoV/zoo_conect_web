import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { BadgeModule } from "primeng/badge";
import { RippleModule } from "primeng/ripple";
import { TooltipModule } from "primeng/tooltip";

export interface NavigationItem {
  readonly text: string;
  readonly icon: string;
  readonly route: string;
  readonly disabled?: boolean;
  readonly comingSoon?: boolean;
  readonly badge?: string | number;
  readonly tooltip?: string;
}

@Component({
  selector: "zoo-sidebar-vet-menu",
  imports: [
    RouterLink,
    RouterLinkActive,
    BadgeModule,
    TooltipModule,
    RippleModule,
  ],
  templateUrl: "./sidebar-vet-menu.html",
  styleUrl: "./sidebar-vet-menu.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarVetMenu {
  rutaBaseVet = "/vet";

  protected readonly navigationItems = signal<NavigationItem[]>([
    {
      text: "Dashboard Médico",
      icon: "pi pi-heart-pulse",
      route: `${this.rutaBaseVet}/dashboard`,
    },
    {
      text: "Mis Tareas",
      icon: "pi pi-check-square",
      route: `${this.rutaBaseVet}/tareas`,
      badge: 3,
      tooltip: "Consultas y procedimientos asignados",
    },
    {
      text: "Gestión de Dietas",
      icon: "pi pi-apple",
      route: `${this.rutaBaseVet}/dietas/`,
      tooltip: "Planificación nutricional",
    },
    {
      text: "Pacientes (Animales)",
      icon: "pi pi-id-card",
      route: `${this.rutaBaseVet}/pacientes`,
    },
    {
      text: "Historial Clínico",
      icon: "pi pi-book",
      route: `${this.rutaBaseVet}/historial`,
      disabled: true,
      comingSoon: true,
    },
    {
      text: "Inventario Médico",
      icon: "pi pi-briefcase",
      route: `${this.rutaBaseVet}/inventario`,
      tooltip: "Medicinas y equipos",
    },
  ]);
}
