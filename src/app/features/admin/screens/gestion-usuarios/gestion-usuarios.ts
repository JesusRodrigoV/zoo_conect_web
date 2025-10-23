import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Splitter, SplitterModule } from 'primeng/splitter';
import { SplitterLayout } from '../../components/splitter-layout/splitter-layout';

@Component({
  selector: 'app-gestion-usuarios',
  imports: [RouterLink, RouterOutlet, ScrollPanelModule, SplitterModule, MatButtonModule, SplitterLayout],
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GestionUsuarios {}
