import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthStore } from '@app/core/store/auth.store';
import { Loader } from '@app/shared/components';
import {
  LogoutDialogComponent,
  UserInfoCardComponent,
  ProfileActionsCardComponent,
  type UserStats,
} from './components';

@Component({
  selector: 'zoo-profile',
  imports: [
    UserInfoCardComponent,
    ProfileActionsCardComponent,
    Loader,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Profile {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  protected readonly currentUser = this.authStore.usuario;

  protected readonly userStats = computed((): UserStats => ({
    quizzes: 12,
    surveys: 8,
    points: 245,
  }));

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
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.authStore.logout();
      }
    });
  }
}
