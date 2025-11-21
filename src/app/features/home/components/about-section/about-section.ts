import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  signal,
} from "@angular/core";
import AOS from "aos";

interface AboutFeature {
  icon: string;
  text: string;
}

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
      AOS.refresh();
    });
  }
  readonly features: AboutFeature[] = [
    { icon: "pi pi-verified", text: "Certificados internacionalmente" },
    { icon: "pi pi-flask", text: "Investigación de vanguardia" },
    { icon: "pi pi-users", text: "Programas comunitarios" },
    { icon: "pi pi-globe", text: "Reconocimiento global" },
  ];
}
