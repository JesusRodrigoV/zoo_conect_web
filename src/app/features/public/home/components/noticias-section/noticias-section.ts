import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-noticias-section',
  imports: [CardModule, ChipModule],
  templateUrl: './noticias-section.html',
  styleUrl: './noticias-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticiasSection {}
