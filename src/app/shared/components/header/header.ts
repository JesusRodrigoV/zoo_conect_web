import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@app/core/store/auth.store';

@Component({
  selector: 'zoo-header',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private authStore = inject(AuthStore);
  readonly autenticado = signal(this.authStore.isAuthenticated());
}
