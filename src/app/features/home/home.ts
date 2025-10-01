import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Loader } from '@app/shared/components/loader';

@Component({
  selector: 'app-home',
  imports: [Loader],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Home {}
