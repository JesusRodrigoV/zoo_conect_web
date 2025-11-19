import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
} from "@angular/core";
import { ButtonModule } from "primeng/button";
import AOS from "aos";
import { RouterLink } from "@angular/router";

interface ServiceFeature {
  text: string;
}

interface ServiceCard {
  icon: string;
  title: string;
  description: string;
  isPrimary: boolean;
  features: ServiceFeature[];
}

@Component({
  selector: "app-services-section",
  imports: [ButtonModule, RouterLink],
  templateUrl: "./services-section.html",
  styleUrl: "./services-section.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSection {
  constructor() {
    afterRenderEffect(() => {
      AOS.refresh();
    });
  }

  readonly serviceCards: ServiceCard[] = [
    {
      icon: "pi pi-book",
      title: "Educación Ambiental",
      description: "Programas educativos innovadores para todas las edades",
      isPrimary: true,
      features: [
        { text: "Talleres interactivos" },
        { text: "Charlas con expertos" },
        { text: "Material didáctico" },
      ],
    },
    {
      icon: "pi pi-id-card",
      title: "Exhibiciones",
      description: "Más de 200 especies en hábitats naturalizados",
      isPrimary: false,
      features: [
        { text: "Mamíferos exóticos" },
        { text: "Aves tropicales" },
        { text: "Reptiles fascinantes" },
      ],
    },
    {
      icon: "pi pi-leaf",
      title: "Conservación",
      description: "Programas activos de reproducción y rescate",
      isPrimary: false,
      features: [
        { text: "Especies en peligro" },
        { text: "Rehabilitación" },
        { text: "Reintroducción" },
      ],
    },
    {
      icon: "pi pi-question-circle",
      title: "Experiencias Interactivas",
      description: "Participa en actividades educativas únicas",
      isPrimary: false,
      features: [
        { text: "Quizzes temáticos" },
        { text: "Encuestas" },
        { text: "Tours virtuales" },
      ],
    },
  ];
}
