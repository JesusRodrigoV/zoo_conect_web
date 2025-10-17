import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Splitter, SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-gestion-usuarios',
  imports: [RouterLink, RouterOutlet, ScrollPanelModule, SplitterModule, MatButtonModule],
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GestionUsuarios {}
