import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-about-section",
  imports: [],
  templateUrl: "./about-section.html",
  styleUrl: "./about-section.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSection {}
