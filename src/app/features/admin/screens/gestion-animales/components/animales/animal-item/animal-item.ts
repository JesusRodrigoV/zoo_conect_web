import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import { Animal } from '@models/animales';
import { AnimalAdapter } from '@adapters/animales';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'zoo-animal-item',
  imports: [
    CardModule, 
    ButtonModule, 
    TagModule, 
    DividerModule,
    ImageModule
  ],
  templateUrl: './animal-item.html',
  styleUrl: './animal-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalItem {
  readonly animal = input<Animal | null>(null);
  
  readonly estadoAnimal = computed((): { texto: string, severity: 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' } => {
    const animal = this.animal();
    if (!animal) return { texto: 'Sin datos', severity: 'secondary' };
    
    const severityMap: Record<string, 'success' | 'info' | 'warn' | 'secondary' | 'danger' | 'contrast'> = {
      'success': 'success',
      'info': 'info', 
      'warn': 'warn',
      'secondary': 'secondary',
      'danger': 'danger',
      'contrast': 'contrast'
    };
    
    const colorFromAdapter = AnimalAdapter.getEstadoColor(animal.estado_operativo);
    
    return {
      texto: animal.estado_operativo,
      severity: severityMap[colorFromAdapter] || 'secondary'
    };
  });

  readonly generoTexto = computed(() => {
    const animal = this.animal();
    return animal ? AnimalAdapter.getGeneroTexto(animal.genero) : '';
  });

  readonly imagenPrincipal = computed(() => {
    const animal = this.animal();
    if (!animal?.media || animal.media.length === 0) return '';
    
    const imagen = animal.media.find(m => m.tipo_medio === 'imagen');
    return imagen?.url || '';
  });

  readonly edadAproximada = computed(() => {
    const animal = this.animal();
    if (!animal) return '';
    
    const fechaNac = new Date(animal.fecha_nacimiento);
    const hoy = new Date();
    const diffTime = Math.abs(hoy.getTime() - fechaNac.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const años = Math.floor(diffDays / 365);
    
    return años > 0 ? `${años} año${años > 1 ? 's' : ''}` : 'Menos de 1 año';
  });
}
