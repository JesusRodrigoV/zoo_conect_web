import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import { Validators, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { DatePickerModule } from "primeng/datepicker";
import { MessageModule } from "primeng/message";
import { InputTextModule } from "primeng/inputtext";
import { FloatLabel } from "primeng/floatlabel";
import { SelectModule } from "primeng/select";
import { InputNumberModule } from "primeng/inputnumber";
import { DatePipe, NgTemplateOutlet } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { ShowToast } from "@app/shared/services";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminQuizzes } from "@app/features/private/admin/services/admin-quizzes";
import { finalize } from "rxjs/operators";
import { CardModule } from "primeng/card";
import { MainContainer } from "@app/shared/components/main-container";
import { Loader } from "@app/shared/components";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ConfirmationService } from "primeng/api";
import { CreateTrivia } from "@models/quiz";

interface CreateQuizRequest {
  fechaTrivia: string;
  cantidadPreguntas: number;
  dificultad: string;
}

@Component({
  selector: "zoo-crear-quiz",
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    MessageModule,
    InputTextModule,
    FloatLabel,
    ConfirmPopupModule,
    Loader,
    CardModule,
    ButtonModule,
    DatePickerModule,
    SelectModule,
    InputNumberModule,
  ],
  providers: [ConfirmationService],
  templateUrl: "./crear-quiz.html",
  styleUrl: "./crear-quiz.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CrearQuiz {
  private readonly showToast = inject(ShowToast);
  private readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly adminQuizzes = inject(AdminQuizzes);
  private confirmationService = inject(ConfirmationService);

  protected readonly formSubmitted = signal(false);
  protected readonly isLoading = signal(false);
  protected readonly isEditMode = signal(false);
  private readonly currentQuizId = signal<number | null>(null);

  protected readonly pageTitle = computed(() =>
    this.isEditMode() ? "Editar Quiz" : "Crear Nuevo Quiz",
  );
  protected readonly pageSubtitle = computed(() =>
    this.isEditMode()
      ? "Actualiza los datos del quiz"
      : "Ingresa los datos del nuevo quiz",
  );
  protected readonly buttonText = computed(() =>
    this.isEditMode() ? "Guardar Cambios" : "Crear Quiz",
  );

  protected readonly dificultades = [
    { label: "Fácil", value: "Fácil" },
    { label: "Medio", value: "Medio" },
    { label: "Difícil", value: "Difícil" },
  ];

  protected readonly minDate = computed(() => new Date());

  protected readonly quizForm = this.fb.group({
    fechaTrivia: [null as Date | null, [Validators.required]],
    cantidadPreguntas: [
      10,
      [Validators.required, Validators.min(1), Validators.max(50)],
    ],
    dificultad: ["", [Validators.required]],
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get("id");
    if (idParam) {
      const id = +idParam;
      this.isEditMode.set(true);
      this.currentQuizId.set(id);
      this.loadQuizData(id);
    }
  }

  private loadQuizData(id: number): void {
    this.isLoading.set(true);
    this.adminQuizzes
      .getTriviaById(id)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (quiz) => {
          this.quizForm.patchValue({
            ...quiz,
            fechaTrivia: new Date(quiz.fecha),
          });
        },
        error: (err) => {
          this.showToast.showError("Error", "No se pudo cargar el quiz.");
          this.router.navigate(["/admin/quizzes"]);
        },
      });
  }

  protected onSubmit(): void {
    this.formSubmitted.set(true);

    if (!this.quizForm.valid) {
      this.showToast.showError(
        "Formulario inválido",
        "Por favor complete todos los campos requeridos",
      );
      return;
    }

    if (this.isEditMode()) {
      this.updateQuiz();
    } else {
      this.createQuiz();
    }
  }

  private createQuiz(): void {
    if (this.isLoading()) return;
    this.isLoading.set(true);

    const formValue = this.quizForm.value;
    const fechaTriviaDate = formValue.fechaTrivia as Date;

    const quizData: CreateTrivia = {
      fecha: fechaTriviaDate.toISOString(),
      cantidadPreguntas: formValue.cantidadPreguntas!,
      dificultad: formValue.dificultad!,
    };

    this.adminQuizzes
      .createTrivia(quizData)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (quiz) => {
          this.showToast.showSuccess("Éxito", `Quiz creado exitosamente`);
          this.router.navigate(["/admin/quizzes"]);
        },
        error: (error) => {
          this.handleApiError(error, "crear");
        },
      });
  }

  private updateQuiz(): void {
    if (this.isLoading() || !this.currentQuizId()) return;
    this.isLoading.set(true);
    const id = this.currentQuizId()!;

    const formValue = this.quizForm.value;
    const fechaTriviaDate = formValue.fechaTrivia as Date;

    const quizData: Partial<CreateTrivia> = {
      fecha: fechaTriviaDate.toISOString(),
      cantidadPreguntas: formValue.cantidadPreguntas!,
      dificultad: formValue.dificultad!,
    };

    this.adminQuizzes
      .updateTrivia(id, quizData)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (quiz) => {
          this.showToast.showSuccess("Éxito", `Quiz actualizado exitosamente`);
          this.router.navigate(["/admin/quizzes"]);
        },
        error: (error) => {
          this.handleApiError(error, "actualizar");
        },
      });
  }

  private handleApiError(error: any, action: "crear" | "actualizar"): void {
    console.error(`Error al ${action} quiz:`, error);
    let errorMessage = `Error al ${action} el quiz`;
    this.showToast.showError("Error", errorMessage);
  }

  protected cancelar(): void {
    this.router.navigate(["/admin/quizzes"]);
  }

  protected isInvalid(fieldName: string): boolean {
    const field = this.quizForm.get(fieldName);
    return !!(
      field &&
      field.invalid &&
      (field.dirty || field.touched || this.formSubmitted())
    );
  }

  protected getErrorMessage(fieldName: string): string {
    const control = this.quizForm.get(fieldName);
    if (!control || !control.errors) return "";

    const errors = control.errors;
    const fieldLabels: { [key: string]: string } = {
      fechaTrivia: "La fecha",
      cantidadPreguntas: "La cantidad de preguntas",
      dificultad: "La dificultad",
    };
    const fieldNameText = fieldLabels[fieldName] || "Este campo";

    if (errors["required"]) {
      return `${fieldNameText} es requerido`;
    }
    if (errors["min"]) {
      return `${fieldNameText} debe ser al menos ${errors["min"].min}`;
    }
    if (errors["max"]) {
      return `${fieldNameText} no puede ser mayor a ${errors["max"].max}`;
    }

    return "Campo inválido";
  }
}
