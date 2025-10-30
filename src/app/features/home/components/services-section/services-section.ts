import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
} from "@angular/core";
import { ButtonModule } from "primeng/button";
import AOS from "aos";
import "aos/dist/aos.css";

@Component({
  selector: "app-services-section",
  imports: [ButtonModule],
  templateUrl: "./services-section.html",
  styleUrl: "./services-section.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSection {
  constructor() {
    afterRenderEffect(() => {
      AOS.init({});
    });
  }
}
