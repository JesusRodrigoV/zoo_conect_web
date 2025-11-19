import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Encuesta } from '@app/core/models/encuestas';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-encuesta-item',
  imports: [CardModule, TagModule, ButtonModule, RouterLink, DatePipe, TooltipModule],
  templateUrl: './encuesta-item.html',
  styleUrl: './encuesta-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EncuestaItem {
  readonly encuesta = input.required<Encuesta>();

  ngOnInit() {
    console.log( this.encuesta());
  }

  protected readonly isAvailable = computed(() => {
    const now = new Date();
    const start = new Date(this.encuesta().fechaInicio);
    return now >= start;
  });

  protected readonly tooltipText = computed(() => {
    if (!this.isAvailable()) {
      return 'Esta encuesta estará disponible próximamente';
    }
    return '';
  });
  
  protected readonly status = computed(() => {
    const now = new Date();
    const start = new Date(this.encuesta().fechaInicio);
    const end = new Date(this.encuesta().fechaFin);
    
    if (now < start) return { severity: 'warn' as const, value: 'Próximamente' };
    if (now > end) return { severity: 'danger' as const, value: 'Finalizada' };
    return { severity: 'success' as const, value: 'Activa' };
  });
}
