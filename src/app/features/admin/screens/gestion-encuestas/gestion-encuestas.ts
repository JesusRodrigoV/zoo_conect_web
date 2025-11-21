import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { SplitterModule } from "primeng/splitter";
import { SplitterLayout } from "../../components/splitter-layout/splitter-layout";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { MainContainer } from "@app/shared/components/main-container";
import { ButtonModule } from "primeng/button";

interface TabOption {
  readonly label: string;
  readonly component: string;
  readonly icon: string;
}

@Component({
  selector: "app-gestion-encuestas",
  imports: [
    SplitterModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ScrollPanelModule,
    SplitterLayout,
    MainContainer,
    ButtonModule,
  ],
  templateUrl: "./gestion-encuestas.html",
  styleUrl: "./gestion-encuestas.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GestionEncuestas {
  protected readonly selectedTabIndex = signal(0);

  protected readonly tabOptions = signal<TabOption[]>([
    {
      label: "Gestionar Encuestas",
      component: "gestionar",
      icon: "list",
    },
    {
      label: "Estadísticas",
      component: "estadisticas",
      icon: "bar_chart",
    },
  ]);

  protected onTabChange(index: number): void {
    this.selectedTabIndex.set(index);
  }
}
