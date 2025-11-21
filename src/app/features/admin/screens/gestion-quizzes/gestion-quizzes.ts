import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { SplitterModule } from "primeng/splitter";
import { SplitterLayout } from "../../components/splitter-layout/splitter-layout";
import { MainContainer } from "@app/shared/components/main-container";

@Component({
  selector: "app-gestion-quizzes",
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    CardModule,
    SplitterModule,
    ScrollPanelModule,
    SplitterLayout,
    MainContainer,
  ],
  templateUrl: "./gestion-quizzes.html",
  styleUrl: "./gestion-quizzes.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GestionQuizzes {}
