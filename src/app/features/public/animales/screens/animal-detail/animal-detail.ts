import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { MainContainer } from "@app/shared/components/main-container";

@Component({
  selector: "app-animal-detail",
  imports: [MainContainer],
  templateUrl: "./animal-detail.html",
  styleUrl: "./animal-detail.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AnimalDetail {
  title = signal<string>("Signal de nombre de animal calculado dinamicamente");
}
