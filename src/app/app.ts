import { Component, inject, OnInit, PLATFORM_ID } from "@angular/core";
import { RouteConfigLoadEnd, RouterLink, RouterOutlet } from "@angular/router";
import { AuthStore } from "./core/stores/auth.store";
import { isPlatformBrowser } from "@angular/common";
import { ScrollTopModule } from "primeng/scrolltop";
import { Toast } from "primeng/toast";
import { ShowToast } from "./shared/services";
import { ButtonModule } from "primeng/button";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ScrollTopModule, Toast, ButtonModule, RouterLink],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App implements OnInit {
  protected title = "zoo-connect-web";
  private readonly authStore = inject(AuthStore);
  private showToast = inject(ShowToast);
  private platformId = inject(PLATFORM_ID);
  private authInitialized = false;
  private messageService = inject(MessageService);

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId) && !this.authInitialized) {
      this.authInitialized = true;
      await this.initializeAuth();
    }
  }

  private async initializeAuth(): Promise<void> {
    try {
      await this.authStore.initializeAuth();
      if (this.authStore.suggest2FA()) {
        this.messageService.add({
          key: "toast-con-link",
          sticky: true,
          severity: "warn",
          summary: "Habilitación de Verificacion en dos pasos",
          detail:
            "Tu cuenta puede ser más segura si habilitas la verificación en dos pasos.",
        });
      }
    } catch (error) {
      this.showToast.showError(
        "Error",
        "No se pudo restaurar tu sesion, intentalo de nuevo mas tarde",
      );
      console.error("Error inicializando autenticación:", error);
    }
  }

  cerrarToast() {
    this.messageService.clear("toast-con-link");
  }
}
