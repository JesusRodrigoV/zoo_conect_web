import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Footer, Header } from "@app/shared/components";
import { MainContainer } from "@app/shared/components/main-container";

@Component({
  selector: "app-cuidador",
  imports: [Header, Footer, MainContainer],
  templateUrl: "./cuidador.html",
  styleUrl: "./cuidador.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Cuidador {}
