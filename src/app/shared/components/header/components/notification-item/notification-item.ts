import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Notificacion } from '@models/notificaciones';

@Component({
  selector: 'zoo-notification-item',
  imports: [],
  templateUrl: './notification-item.html',
  styleUrl: './notification-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationItem {
  notificacion = input<Notificacion | null>(null);
}
