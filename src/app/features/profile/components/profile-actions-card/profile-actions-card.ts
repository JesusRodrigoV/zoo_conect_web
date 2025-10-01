import {
  ChangeDetectionStrategy,
  Component,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'zoo-profile-actions-card',
  imports: [MatButtonModule, MatCardModule, MatDividerModule, MatIconModule],
  templateUrl: './profile-actions-card.html',
  styleUrl: './profile-actions-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileActionsCardComponent {
  readonly editProfile = output<void>();
  readonly shareProfile = output<void>();
  readonly viewStats = output<void>();
  readonly viewParticipations = output<void>();
  readonly logout = output<void>();

  protected onEditProfile(): void {
    this.editProfile.emit();
  }

  protected onShareProfile(): void {
    this.shareProfile.emit();
  }

  protected onViewStats(): void {
    this.viewStats.emit();
  }

  protected onViewParticipations(): void {
    this.viewParticipations.emit();
  }

  protected onLogout(): void {
    this.logout.emit();
  }
}