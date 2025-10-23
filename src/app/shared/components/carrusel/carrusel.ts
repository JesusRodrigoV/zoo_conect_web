import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-carrusel',
  imports: [],
  templateUrl: './carrusel.html',
  styleUrl: './carrusel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Carrusel implements AfterViewInit{
  swipRef = viewChild<ElementRef>('swiper');

  ngAfterViewInit(): void {
    
  }
}
