import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Footer, Header } from '@app/shared/components';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarAdminMenu } from '../../components/sidebar-admin-menu';

@Component({
  selector: 'app-admin-layout',
  imports: [
    Header,
    Footer,
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    SidebarAdminMenu,
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminLayout {}
