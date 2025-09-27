import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'zoo-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
