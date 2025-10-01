import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'zoo-logout-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './logout-dialog.html',
  styleUrls: ['./logout-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<LogoutDialogComponent>);

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
