import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Encuesta } from '@models/encuestas/encuesta.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'zoo-encuesta-item',
  imports: [
    DatePipe, 
    CardModule, 
    ButtonModule, 
    TagModule,
    TooltipModule
  ],
  templateUrl: './encuesta-item.html',
  styleUrl: './encuesta-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EncuestaItem {
  readonly encuesta = input<Encuesta | null>(null);
  readonly onEdit = output<Encuesta>();
  readonly onView = output<Encuesta>();
  readonly onDelete = output<Encuesta>();
  
  readonly estadoEncuesta = computed(() => {
    const enc = this.encuesta();
    if (!enc) return { texto: 'Sin datos', severity: 'secondary' as const };
    
    const ahora = new Date();
    const inicio = new Date(enc.fechaInicio);
    const fin = new Date(enc.fechaFin);
    
    if (ahora < inicio) {
      return { texto: 'Próximamente', severity: 'info' as const };
    } else if (ahora >= inicio && ahora <= fin) {
      return { texto: 'Activa', severity: 'success' as const };
    } else if(ahora > fin) {
      return { texto: 'Finalizada', severity: 'danger' as const };
    }
    return { texto: 'No se hay error creo', severity: 'danger' as const };
  });
  
  readonly diasRestantes = computed(() => {
    const enc = this.encuesta();
    if (!enc) return 0;
    
    const ahora = new Date();
    const fin = new Date(enc.fechaFin);
    const diferencia = fin.getTime() - ahora.getTime();
    const dias = Math.ceil(diferencia / (1000 * 3600 * 24));
    
    return dias > 0 ? dias : 0;
  });
}
