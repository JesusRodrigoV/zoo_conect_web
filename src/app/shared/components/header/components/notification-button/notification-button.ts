import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Notificaciones } from '@app/shared/services/notificaciones';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { PopoverModule } from 'primeng/popover';
import { NotificationItem } from '../notification-item';
import { Notificacion } from '@models/notificaciones';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'zoo-notification-button',
  imports: [ButtonModule, OverlayBadgeModule, MenuModule, PopoverModule, NotificationItem, Tooltip],
  templateUrl: './notification-button.html',
  styleUrl: './notification-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationButton {
  private notificacionesService = inject(Notificaciones);

  protected readonly notificaciones = signal<Notificacion[]>(
    this.notificacionesService.getMockNotificaciones()
  );

  protected readonly noLeidasCuenta = computed(() => {
    return this.notificaciones()
      ? this.notificaciones().filter((n) => !n.leido).length
      : 0;
  });

  showNotifications(event: Event): void {}
}
