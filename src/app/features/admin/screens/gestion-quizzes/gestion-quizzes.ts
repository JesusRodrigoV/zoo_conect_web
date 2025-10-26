import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SplitterModule } from 'primeng/splitter';
import { SplitterLayout } from '../../components/splitter-layout/splitter-layout';
import { MainContainer } from '@app/shared/components/main-container';

@Component({
  selector: 'app-gestion-quizzes',
  imports: [
    RouterOutlet,
    RouterLink,
    ButtonModule,
    CardModule,
    SplitterModule,
    ScrollPanelModule,
    MatButtonModule,
    SplitterLayout, 
    MainContainer
  ],
  templateUrl: './gestion-quizzes.html',
  styleUrl: './gestion-quizzes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GestionQuizzes {}
