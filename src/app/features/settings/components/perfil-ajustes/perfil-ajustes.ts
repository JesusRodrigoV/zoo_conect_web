import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { Theme } from "../../services";
import { CardModule } from "primeng/card";
import { ToggleSwitchModule } from "primeng/toggleswitch";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "perfil-ajustes",
  imports: [CardModule, ToggleSwitchModule, FormsModule],
  templateUrl: "./perfil-ajustes.html",
  styleUrls: ["./perfil-ajustes.scss", "../settings-content.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PerfilAjustes {
  private themeService = inject(Theme);

  protected isDarkMode = computed(() => this.themeService.isDarkMode());

  protected darkModeModel = this.themeService.isDarkMode();

  onThemeChange(isDark: boolean): void {
    this.darkModeModel = isDark;
    this.themeService.setTheme(isDark ? "dark" : "light");
  }
}
