import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '@app/core/stores/auth.store';
import { Loader } from '@app/shared/components';
import {
  LogoutDialogComponent,
  UserInfoCardComponent,
  ProfileActionsCardComponent,
  type UserStats,
} from './components';
import { MainContainer } from '@app/shared/components/main-container';

@Component({
  selector: 'zoo-profile',
  imports: [
    UserInfoCardComponent,
    ProfileActionsCardComponent,
    LogoutDialogComponent,
    Loader,
    MainContainer
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Profile {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  protected readonly currentUser = this.authStore.usuario;
  protected readonly showLogoutDialog = signal(false);

  protected readonly userStats = computed(
    (): UserStats => ({
      quizzes: 12,
      surveys: 8,
      points: 245,
    })
  );

  protected editProfile(): void {
    console.log('Editar perfil');
  }

  protected shareProfile(): void {
    console.log('Compartir perfil');
  }

  protected viewStats(): void {
    this.router.navigate(['/estadisticas']);
  }

  protected viewParticipations(): void {
    this.router.navigate(['/participaciones']);
  }

  protected confirmLogout(): void {
    this.showLogoutDialog.set(true);
  }

  protected onLogoutCancel(): void {
    this.showLogoutDialog.set(false);
  }

  protected onLogoutConfirm(): void {
    this.showLogoutDialog.set(false);
    this.authStore.logout();
  }
}
