import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-noticias-section',
  imports: [
    MatIconModule,
    MatCardModule,
    MatChipsModule,
  ],
  templateUrl: './noticias-section.html',
  styleUrl: './noticias-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoticiasSection {

}
