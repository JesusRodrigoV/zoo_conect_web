import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from "@angular/core";
import { NgClass } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "zoo-3d-card",
  imports: [NgClass, MatButtonModule],
  templateUrl: "./card3d.html",
  styleUrl: "./card3d.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(mouseenter)": "onMouseEnter($event)",
    "(mouseleave)": "onMouseLeave($event)",
    "(mousemove)": "onMouseMove($event)",
  },
})
export class Zoo3DCard {
  readonly containerClass = input<string>("");
  readonly className = input<string>("");

  protected readonly cardRef = viewChild<ElementRef>("cardElement");
  readonly isMouseEntered = signal(false);

  onMouseEnter(event: MouseEvent): void {
    this.isMouseEntered.set(true);
  }

  onMouseLeave(event: MouseEvent): void {
    const cardElement = this.cardRef()?.nativeElement;
    if (cardElement) {
      cardElement.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
    this.isMouseEntered.set(false);
  }

  onMouseMove(event: MouseEvent): void {
    const cardElement = this.cardRef()?.nativeElement;
    if (!cardElement) return;

    const rect = cardElement.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / 25;
    const y = (event.clientY - rect.top - rect.height / 2) / 25;

    cardElement.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  }
}
