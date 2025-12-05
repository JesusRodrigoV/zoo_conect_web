import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import { TareaRecurrente } from "@app/features/private/admin/models/tareas/tarea.model";
import { ZooItemActionButton } from "@app/shared/components/ui/zoo-item-action-button";
import { TagModule } from "primeng/tag";

@Component({
  selector: "tr[zoo-rutina-item]",
  imports: [TagModule, ZooItemActionButton],
  templateUrl: "./rutina-item.html",
  styleUrl: "./rutina-item.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RutinaItem {
  item = input.required<any>();

  onEdit = output<number>();
  onDelete = output<number>();
}
