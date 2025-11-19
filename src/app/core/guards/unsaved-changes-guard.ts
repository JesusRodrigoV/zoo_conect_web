import { Signal } from "@angular/core";
import { inject } from "@angular/core/primitives/di";
import { FormGroup } from "@angular/forms";
import { CanDeactivateFn } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { Observable } from "rxjs";

export interface HasUnsavedChanges {
  form: Signal<FormGroup>;
  isSubmitting: Signal<boolean>;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (
  component: HasUnsavedChanges,
) => {
  const confirmationService = inject(ConfirmationService);

  if (!component.form().dirty || component.isSubmitting()) {
    return true;
  }

  return new Observable<boolean>((subscriber) => {
    confirmationService.confirm({
      message:
        "Tienes respuestas sin enviar. ¿Estás seguro de que deseas salir?",
      header: "Cambios sin guardar",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Salir",
      rejectLabel: "Permanecer",
      accept: () => {
        subscriber.next(true);
        subscriber.complete();
      },
      reject: () => {
        subscriber.next(false);
        subscriber.complete();
      },
    });
  });
};
