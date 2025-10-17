import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';

interface TabOption {
  readonly label: string;
  readonly component: string;
  readonly icon: string;
}

@Component({
  selector: 'app-gestion-encuestas',
  imports: [MatButtonModule,SplitterModule, RouterLink, RouterOutlet, ScrollPanelModule],
  templateUrl: './gestion-encuestas.html',
  styleUrl: './gestion-encuestas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GestionEncuestas {
  protected readonly selectedTabIndex = signal(0);
  
  protected readonly tabOptions = signal<TabOption[]>([
    {
      label: 'Gestionar Encuestas',
      component: 'gestionar',
      icon: 'list'
    },
    {
      label: 'Estadísticas',
      component: 'estadisticas', 
      icon: 'bar_chart'
    }
  ]);

  protected onTabChange(index: number): void {
    this.selectedTabIndex.set(index);
  }
}
