import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthStore } from "@app/core/stores/auth.store";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-hero-section",
  imports: [RouterLink, ButtonModule],
  templateUrl: "./hero-section.html",
  styleUrl: "./hero-section.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  private readonly authStore = inject(AuthStore);
  protected readonly autenticado = computed(() => !!this.authStore.usuario());
}
