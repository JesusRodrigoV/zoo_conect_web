import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'zoo-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Profile {

}
