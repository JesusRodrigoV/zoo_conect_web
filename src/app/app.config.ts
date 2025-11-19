import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from "@angular/core";
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from "@angular/router";

import { routes } from "./app.routes";
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from "@angular/platform-browser";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { authInterceptor } from "./core/interceptors";
import { providePrimeNG } from "primeng/config";
import { provideAnimations } from "@angular/platform-browser/animations";
import { ConfirmationService, MessageService } from "primeng/api";
import ZooPreset from "../theme/zoo-preset";
import { AuthStore } from "@stores/auth.store";
import { ShowToast } from "./shared/services";
import { RolId } from "@models/usuario";
import { CustomTitleStrategy } from "./core/services/custom-title-strategy";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: "top" }),
    ),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
    providePrimeNG({
      theme: {
        preset: ZooPreset,
        options: {
          darkModeSelector: ".dark-mode",
          cssLayer: false,
        },
      },
    }),
    provideAnimations(),
    MessageService,
    ConfirmationService,
    provideAppInitializer(() => {
      const authStore = inject(AuthStore);
      const toastService = inject(ShowToast);

      return authStore.initializeAuth().then(() => {});
    }),
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
  ],
};
