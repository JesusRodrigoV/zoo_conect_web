import {
  ChangeDetectionStrategy,
  Component,
  input,
  computed,
  output,
} from '@angular/core';
import { Especie } from '@models/animales';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'zoo-especie-item',
  imports: [CardModule, ButtonModule, TagModule, DividerModule],
  templateUrl: './especie-item.html',
  styleUrl: './especie-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EspecieItem {
  readonly especie = input<Especie | null>(null);

  readonly verDetalles = output<Especie>();
  readonly editar = output<Especie>();
  readonly eliminar = output<Especie>();

  readonly estadoEspecie = computed(() => {
    const esp = this.especie();
    if (!esp) return { texto: 'Sin datos', severity: 'secondary' as const };

    return esp.isActive
      ? { texto: 'Activa', severity: 'success' as const }
      : { texto: 'Inactiva', severity: 'danger' as const };
  });

  readonly taxonomiaCompleta = computed(() => {
    const esp = this.especie();
    if (!esp) return '';

    return `${esp.filo} > ${esp.clase} > ${esp.orden} > ${esp.familia} > ${esp.genero}`;
  });

  protected onVerDetalles(): void {
    const esp = this.especie();
    if (esp) {
      this.verDetalles.emit(esp);
    }
  }

  protected onEditar(): void {
    const esp = this.especie();
    if (esp) {
      this.editar.emit(esp);
    }
  }

  protected onEliminar(): void {
    const esp = this.especie();
    if (esp) {
      this.eliminar.emit(esp);
    }
  }
}
