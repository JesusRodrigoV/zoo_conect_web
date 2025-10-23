import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AdminQuizzes } from '@app/features/admin/services/admin-quizzes';
import { Loader } from '@app/shared/components';
import { DataView } from 'primeng/dataview';
import { QuizItem } from '../quiz-item';

@Component({
  selector: 'zoo-lista-quizzes',
  imports: [AsyncPipe, Loader, DataView, QuizItem],
  templateUrl: './lista-quizzes.html',
  styleUrl: './lista-quizzes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListaQuizzes {
  private quizService = inject(AdminQuizzes);
  protected quizzes$ = this.quizService.getAllQuizzes();
}
