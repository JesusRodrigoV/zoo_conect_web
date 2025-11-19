import { DatePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  input,
  computed,
  output,
} from "@angular/core";
import { Trivia } from "@models/quiz";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { TagModule } from "primeng/tag";
import { RouterLink } from "@angular/router";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: "zoo-quiz-item",
  imports: [
    DatePipe,
    RouterLink,
    CardModule,
    ButtonModule,
    TagModule,
    TooltipModule,
  ],
  templateUrl: "./quiz-item.html",
  styleUrl: "./quiz-item.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizItem {
  readonly quiz = input.required<Trivia>();

  readonly onDetails = output<number>();
  readonly onDelete = output<number>();

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

  protected verDetalles(): void {
    this.onDetails.emit(this.quiz().id);
  }

  protected eliminar(): void {
    this.onDelete.emit(this.quiz().id);
  }
}
