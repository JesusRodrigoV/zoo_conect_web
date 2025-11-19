import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { SplitterModule } from "primeng/splitter";
import { SplitterLayout } from "../../components/splitter-layout/splitter-layout";
import { MainContainer } from "@app/shared/components/main-container";
import { NavMenuGestion } from "../../components/nav-menu-gestion";
import { MenuButton } from "../../models";

@Component({
  selector: "app-gestion-quizzes",
  imports: [
    RouterOutlet,
    ButtonModule,
    CardModule,
    SplitterModule,
    ScrollPanelModule,
    SplitterLayout,
    MainContainer,
    NavMenuGestion
  ],
  templateUrl: "./gestion-quizzes.html",
  styleUrl: "./gestion-quizzes.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GestionQuizzes {
  protected readonly buttons: MenuButton[] = [
  {
    icono: 'pi pi-list',
    texto: 'Lista',
    descripcion: 'Ver y gestionar todos los quizzes existentes.',
    ruta: '/admin/quizzes/',
    exacto: true 
  },
  {
    icono: 'pi pi-plus',
    texto: 'Crear Quiz',
    descripcion: 'Crear un nuevo quiz desde cero.',
    ruta: '/admin/quizzes/crear'
  }
];
}
