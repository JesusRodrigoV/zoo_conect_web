import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import { Tarea } from "@app/features/private/admin/models/tareas/tarea.model";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: "zoo-task-inbox",
  imports: [ButtonModule, TooltipModule],
  templateUrl: "./task-inbox.html",
  styleUrl: "./task-inbox.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskInbox {
  tasks = input.required<Tarea[]>();
  onAssign = output<number>();
  onCancel = output<number>();
}
