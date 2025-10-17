import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Zoo3DCard } from "@app/shared/components";
import { Loader } from "@app/shared/components/loader";

@Component({
  selector: "app-home",
  imports: [Loader, Zoo3DCard],
  templateUrl: "./home.html",
  styleUrl: "./home.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {}
