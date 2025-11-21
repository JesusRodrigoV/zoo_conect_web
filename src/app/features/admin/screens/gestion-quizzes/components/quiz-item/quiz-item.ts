import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { Quiz } from '@models/quiz';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'zoo-quiz-item',
  imports: [
    DatePipe, 
    CardModule, 
    ButtonModule, 
    TagModule, 
    DividerModule
  ],
  templateUrl: './quiz-item.html',
  styleUrl: './quiz-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizItem {
  readonly quiz = input<Quiz | null>(null);
  
  readonly estadoQuiz = computed(() => {
    const quiz = this.quiz();
    if (!quiz) return { texto: 'Sin datos', severity: 'secondary' as const };
    
    const ahora = new Date();
    const fechaTrivia = new Date(quiz.fechaTrivia);
    
    if (fechaTrivia > ahora) {
      return { texto: 'Programado', severity: 'info' as const };
    } else if (fechaTrivia.toDateString() === ahora.toDateString()) {
      return { texto: 'Hoy', severity: 'success' as const };
    } else {
      return { texto: 'Finalizado', severity: 'secondary' as const };
    }
  });

  readonly diasHastaTrivia = computed(() => {
    const quiz = this.quiz();
    if (!quiz) return 0;
    
    const ahora = new Date();
    const fechaTrivia = new Date(quiz.fechaTrivia);
    const diffTime = fechaTrivia.getTime() - ahora.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  });

  readonly severidadDificultad = computed(() => {
    const quiz = this.quiz();
    if (!quiz) return 'secondary' as const;
    
    switch (quiz.dificultad.toLowerCase()) {
      case 'fácil':
        return 'success' as const;
      case 'medio':
        return 'warn' as const;
      case 'difícil':
        return 'danger' as const;
      default:
        return 'secondary' as const;
    }
  });

  protected verDetalles(): void {
    console.log('Ver detalles del quiz:', this.quiz());
  }

  protected editarQuiz(): void {
    console.log('Editar quiz:', this.quiz());
  }

  protected eliminarQuiz(): void {
    console.log('Eliminar quiz:', this.quiz());
  }
}
