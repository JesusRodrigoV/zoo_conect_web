import { Component, inject, OnInit, PLATFORM_ID } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthStore } from "./core/stores/auth.store";
import { isPlatformBrowser } from "@angular/common";
import { ScrollTopModule } from "primeng/scrolltop";
import { Toast } from "primeng/toast";
import { ShowToast } from "./shared/services";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ScrollTopModule, Toast],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App implements OnInit {
  protected title = "zoo-connect-web";
  private readonly authStore = inject(AuthStore);
  private showToast = inject(ShowToast);
  private platformId = inject(PLATFORM_ID);
  private authInitialized = false;

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId) && !this.authInitialized) {
      this.authInitialized = true;
      await this.initializeAuth();
    }
  }

  private async initializeAuth(): Promise<void> {
    try {
      await this.authStore.initializeAuth();
      console.log(this.authStore.suggest2FA());
      if (this.authStore.suggest2FA()) {
        this.showToast.showWarning(
          "Habilitación de Verificacion en dos pasos",
          "Tu cuenta puede ser más segura si habilitas la verificación en dos pasos.",
        );
      }
    } catch (error) {
      this.showToast.showError(
        "Error",
        "No se pudo restaurar tu sesion, intentalo de nuevo mas tarde",
      );
      console.error("Error inicializando autenticación:", error);
    }
  }
}
