import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { Habitat } from "@models/habitat";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { TagModule } from "primeng/tag";

@Component({
  selector: "zoo-habitat-item",
  imports: [CardModule, ButtonModule, TagModule, RouterLink],
  templateUrl: "./habitat-item.html",
  styleUrl: "./habitat-item.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HabitatItem {
  habitat = input.required<Habitat>();
  onDelete = output<number>();

  protected getStatusSeverity(
    isActive: boolean,
  ): "secondary" | "success" | "danger" {
    return isActive ? "success" : "danger";
  }

  protected deleteHabitat(): void {
    this.onDelete.emit(this.habitat().id);
  }
}
