import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { CardData } from "@shared/components/apple-carousel/card-data.model";
import { AppleCarousel } from "@shared/components/apple-carousel";
import { Card } from "@shared/components/apple-carousel/card/card";
import { DummyContent } from "@app/shared/components/apple-carousel/dummy-content";

@Component({
  selector: "app-carousel",
  imports: [AppleCarousel, Card],
  templateUrl: "./carousel.html",
  styleUrl: "./carousel.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carousel {
  readonly cards = signal<CardData[]>([
    {
      category: "Artificial Intelligence",
      title: "You can do more with AI.",
      src: "/assets/images/hero-carousel/1.jpg",
      content: DummyContent,
    },
    {
      category: "Productivity",
      title: "Enhance your productivity.",
      src: "/assets/images/hero-carousel/2.jpg",
      content: DummyContent,
    },
    {
      category: "Product",
      title: "Launching the new Apple Vision Pro.",
      src: "/assets/images/hero-carousel/3.jpeg",
      content: DummyContent,
    },
    {
      category: "Artificial Intelligence",
      title: "You can do more with AI.",
      src: "/assets/images/hero-carousel/4.jpg",
      content: DummyContent,
    },
    {
      category: "Productivity",
      title: "Enhance your productivity.",
      src: "/assets/images/hero-carousel/5.jpg",
      content: DummyContent,
    },
    {
      category: "Product",
      title: "Launching the new Apple Vision Pro.",
      src: "/assets/images/hero-carousel/6.jpg",
      content: DummyContent,
    },
  ]);
}
