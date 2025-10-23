import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  viewChildren,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isPlatformBrowser } from '@angular/common';

interface SocialButton {
  icon: string;
  link: string;
  variant: 'facebook' | 'twitter' | 'instagram' | 'youtube';
  label: string;
}

@Component({
  selector: 'app-social-section',
  imports: [MatButtonModule],
  templateUrl: './social-section.html',
  styleUrl: './social-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialSection implements OnInit, OnDestroy {
  platformID = inject(PLATFORM_ID);
  private readonly hostEl = inject(ElementRef<HTMLElement>);
  socialButtonsRefs = viewChildren<ElementRef<HTMLAnchorElement>>('socialBtn');
  private ctx?: gsap.Context;
  private hoverCleanups: Array<() => void> = [];
  private tl?: gsap.core.Timeline;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformID)) {
      // Registrar plugin solo en navegador
      if (!(gsap as any).plugins?.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }
      this.initAnimation();
    }
  }

  ngOnDestroy(): void {
    // Limpiar listeners de hover
    for (const off of this.hoverCleanups) off();
    this.hoverCleanups = [];
    // Matar el ScrollTrigger asociado al timeline si existe
    this.tl?.scrollTrigger?.kill();
    this.tl = undefined;
    // Revertir el contexto de GSAP (mata tweens y ScrollTriggers creados dentro)
    this.ctx?.revert();
  }

  initAnimation() {
    const sectionRoot = this.hostEl.nativeElement;
    const triggerEl = sectionRoot.querySelector('.social-section') as HTMLElement | null;
    const buttons = this.socialButtonsRefs().map((ref) => ref.nativeElement);

    if (!triggerEl || buttons.length === 0) return;

    // Scope de GSAP para limpiar fácil en destroy
    this.ctx = gsap.context(() => {
      // Timeline con ScrollTrigger adjunto (accesible vía tl.scrollTrigger)
      this.tl = gsap.timeline({
        scrollTrigger: {
          id: 'social-section',
          trigger: triggerEl,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 0.5, // seguimiento suave del scroll
          fastScrollEnd: true, // evita solapamientos cuando se scrollea muy rápido
          preventOverlaps: 'home-anim', // coordina con otros triggers del mismo grupo
          markers: true, // mostrar marcas de inicio/fin para depurar
        },
      });

      // Animación de entrada
      this.tl.from(buttons, {
        y: 20,
        opacity: 0,
        rotation: -15,
        duration: 0.6, // con scrub, la duración funciona como base para la interpolación
        ease: 'back.out(1.7)',
        stagger: 0.1,
      });

      // Hover interactivo por botón
      buttons.forEach((btn) => {
        const onEnter = () => {
          gsap.to(btn, {
            y: -8,
            scale: 1.15,
            rotation: 5,
            duration: 0.3,
            ease: 'power2.out',
          });
        };
        const onLeave = () => {
          gsap.to(btn, {
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        };
        btn.addEventListener('mouseenter', onEnter);
        btn.addEventListener('mouseleave', onLeave);
        this.hoverCleanups.push(() => {
          btn.removeEventListener('mouseenter', onEnter);
          btn.removeEventListener('mouseleave', onLeave);
        });
      });
    }, sectionRoot);

    // Asegurar recálculo correcto de posiciones del trigger
    this.tl?.scrollTrigger?.refresh();
  }

  protected readonly socialButtons: SocialButton[] = [
    {
      icon: 'pi pi-facebook',
      link: 'https://facebook.com/zooconnect',
      variant: 'facebook',
      label: 'Facebook',
    },
    {
      icon: 'pi pi-twitter',
      link: 'https://twitter.com/zooconnect',
      variant: 'twitter',
      label: 'Twitter',
    },
    {
      icon: 'pi pi-instagram',
      link: 'https://instagram.com/zooconnect',
      variant: 'instagram',
      label: 'Instagram',
    },
    {
      icon: 'pi pi-youtube',
      link: 'https://youtube.com/zooconnect',
      variant: 'youtube',
      label: 'YouTube',
    },
  ];
}
