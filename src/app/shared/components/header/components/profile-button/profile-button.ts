import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthStore } from '@app/core/store/auth.store';
import { Usuario } from '@app/features/auth/models/usuario.model';
import { UserAvatar } from '@app/shared/components/user-avatar';
import { UserInfo } from '../user-info';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'zoo-profile-button',
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    UserAvatar,
    UserInfo
  ],
  templateUrl: './profile-button.html',
  styleUrl: './profile-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileButton {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  readonly user = this.authStore.usuario;
  readonly defaultAvatarUrl = '/assets/images/default-avatar.jpg';

  protected readonly avatarUrl = computed(
    () => this.user()?.fotoUrl || this.defaultAvatarUrl
  );

  protected getRoleName(user: Usuario | null): string {
    return user?.rol?.nombre || 'Usuario';
  }

  protected readonly userName = computed(() => this.user()?.username || '');

  protected navigateToProfile(): void {
    this.router.navigate(['/perfil']);
  }

  protected navigateToSettings(): void {
    this.router.navigate(['/ajustes']);
  }

  protected logout(): void {
    this.authStore.logout();
  }
}
