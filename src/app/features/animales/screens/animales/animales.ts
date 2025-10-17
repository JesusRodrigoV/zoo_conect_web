import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-animales',
  imports: [SplitterModule, RouterOutlet],
  templateUrl: './animales.html',
  styleUrl: './animales.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Animales {

}
