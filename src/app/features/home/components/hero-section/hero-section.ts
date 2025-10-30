import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthStore } from "@app/core/stores/auth.store";
import { ButtonModule } from "primeng/button";
import AOS from "aos";
import "aos/dist/aos.css";

@Component({
  selector: "app-hero-section",
  imports: [RouterLink, ButtonModule],
  templateUrl: "./hero-section.html",
  styleUrl: "./hero-section.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  constructor() {
    afterRenderEffect(() => {
      AOS.init({});
    });
  }
  private readonly authStore = inject(AuthStore);
  protected readonly autenticado = computed(() => !!this.authStore.usuario());

  protected readonly stats = [
    { number: "200+", label: "Especies" },
    { number: "30", label: "Años" },
    { number: "1M+", label: "Visitantes" },
  ];
}
