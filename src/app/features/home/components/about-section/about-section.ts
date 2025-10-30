import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  signal,
} from "@angular/core";
import AOS from "aos";
import "aos/dist/aos.css";

@Component({
  selector: "app-about-section",
  imports: [],
  templateUrl: "./about-section.html",
  styleUrl: "./about-section.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSection {
  delay = signal(50);
  time = signal(2000);

  constructor() {
    afterRenderEffect(() => {
      AOS.init({});
    });
  }
}
