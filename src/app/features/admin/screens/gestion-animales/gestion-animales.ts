import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { SplitterLayout } from '../../components/splitter-layout/splitter-layout';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';

interface NavButton {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-gestion-animales',
  imports: [
    MatButtonModule,
    SplitterModule,
    RouterLink,
    RouterOutlet,
    ScrollPanelModule,
    SplitterLayout,
  ],
  templateUrl: './gestion-animales.html',
  styleUrl: './gestion-animales.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GestionAnimales {
  rutaAdmin = '/admin/animales';
  rutaEspecies = `${this.rutaAdmin}/especies`;
  rutaHabitats = `${this.rutaAdmin}/habitat`;

  botonesNav: NavButton[] = [
    {
      label: 'Lista de Especies',
      route: `${this.rutaEspecies}/lista`,
      icon: 'pi pi-list',
    },
    {
      label: 'Añadir Especie',
      route: `${this.rutaEspecies}/crear`,
      icon: 'pi pi-plus',
    },
    {
      label: 'Lista de Hábitats',
      route: `${this.rutaHabitats}/lista`,
      icon: 'pi pi-tags',
    },
    {
      label: 'Añadir Hábitat',
      route: `${this.rutaHabitats}/crear`,
      icon: 'pi pi-map',
    },
    {
      label: 'Lista de Animales',
      route: `${this.rutaAdmin}/lista`,
      icon: 'pi pi-tags',
    },
    {
      label: 'Añadir Animal',
      route: `${this.rutaAdmin}/crear`,
      icon: 'pi pi-map',
    },
  ];
}
