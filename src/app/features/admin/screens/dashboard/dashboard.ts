import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainContainer } from '@app/shared/components/main-container';

@Component({
  selector: 'app-dashboard',
  imports: [MainContainer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Dashboard {

}
