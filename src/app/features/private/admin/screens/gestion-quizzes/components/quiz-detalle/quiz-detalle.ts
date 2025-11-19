import { DatePipe, NgClass } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
} from "@angular/core";
import { Loader } from "@app/shared/components";
import { ButtonModule } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { TagModule } from "primeng/tag";
import { TooltipModule } from "primeng/tooltip";
import { TableLazyLoadEvent, TableModule, TablePageEvent } from "primeng/table";
import { AdminQuizzes } from "@app/features/private/admin/services/admin-quizzes";
import { ParticipacionTrivia, Trivia } from "@models/quiz";
import { PaginatedResponse } from "@models/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { finalize } from "rxjs";

@Component({
  selector: "app-quiz-detalle",
  imports: [
    DatePipe,
    Loader,
    ButtonModule,
    TagModule,
    DividerModule,
    TableModule,
    TooltipModule,
  ],
  templateUrl: "./quiz-detalle.html",
  styleUrl: "./quiz-detalle.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizDetalle {
  readonly quizId = input.required<number>();

  private readonly quizService = inject(AdminQuizzes);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly quiz = signal<Trivia | null>(null);
  protected readonly loading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);

  protected readonly participaciones =
    signal<PaginatedResponse<ParticipacionTrivia> | null>(null);
  protected readonly loadingParticipaciones = signal<boolean>(false);
  protected readonly errorParticipaciones = signal<string | null>(null);

  constructor() {
    effect(() => {
      const id = this.quizId();
      if (id) {
        this.loadQuizDetails(id);
        this.loadParticipaciones(id);
      }
    });
  }

  protected loadQuizDetails(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.quizService
      .getTriviaById(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (data) => this.quiz.set(data),
        error: (err) => {
          console.error("Error al cargar detalle del quiz:", err);
          this.error.set(err.message || "Error al cargar datos.");
        },
      });
  }

  protected handleLazyLoad(event: TableLazyLoadEvent): void {
    const rows = event.rows ?? 5;
    const first = event.first ?? 0;

    const page = first / rows + 1;
    this.loadParticipaciones(this.quizId(), page, rows);
  }

  protected loadParticipaciones(
    id: number,
    page: number = 1,
    size: number = 5,
  ): void {
    this.loadingParticipaciones.set(true);
    this.errorParticipaciones.set(null);

    this.quizService
      .getParticipaciones(id, page, size)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loadingParticipaciones.set(false)),
      )
      .subscribe({
        next: (data) => this.participaciones.set(data),
        error: (err) => {
          console.error("Error al cargar participaciones:", err);
          this.errorParticipaciones.set(
            err.message || "Error al cargar participaciones.",
          );
        },
      });
  }

  readonly estadoQuiz = computed(() => {
    const quiz = this.quiz();
    if (!quiz) return { texto: "Sin datos", severity: "secondary" as const };

    const ahora = new Date();
    const fechaTrivia = new Date(quiz.fecha);
    ahora.setHours(0, 0, 0, 0);
    fechaTrivia.setHours(0, 0, 0, 0);

    if (fechaTrivia > ahora) {
      return { texto: "Programado", severity: "info" as const };
    } else if (fechaTrivia.getTime() === ahora.getTime()) {
      return { texto: "Hoy", severity: "success" as const };
    } else {
      return { texto: "Finalizado", severity: "secondary" as const };
    }
  });

  readonly severidadDificultad = computed(() => {
    const quiz = this.quiz();
    if (!quiz) return "secondary" as const;

    switch (quiz.dificultad.toLowerCase()) {
      case "fácil":
        return "success" as const;
      case "medio":
        return "warn" as const;
      case "difícil":
        return "danger" as const;
      default:
        return "secondary" as const;
    }
  });
}
