import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '@shared/components/header';
import { Footer } from '@shared/components/footer';

@Component({
  selector: 'zoo-layout',
  imports: [Header, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {}
