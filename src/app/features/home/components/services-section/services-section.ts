import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-services-section",
  imports: [ButtonModule],
  templateUrl: "./services-section.html",
  styleUrl: "./services-section.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSection {}
