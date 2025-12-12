import { DatePipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import { Tarea } from "@app/features/private/admin/models/tareas/tarea.model";
import { ButtonModule } from "primeng/button";
import { TagModule } from "primeng/tag";

@Component({
  selector: "tr[app-tarea-item]",
  imports: [DatePipe, TagModule, ButtonModule],
  templateUrl: "./tarea-item.html",
  styleUrl: "./tarea-item.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TareaItem {
  tarea = input.required<Tarea>();
  index = input.required<number>();
  isSaving = input<boolean>(false);

  onCompletar = output<Tarea>();

  esDieta() {
    return this.tarea().tipoTarea?.nombre?.toLowerCase()?.includes("aliment");
  }

  getEstadoLabel(): string {
    const t = this.tarea();
    if (t.isCompleted) return "Completada";

    const fechaProgramada = new Date(t.fechaProgramada);
    const hoy = new Date();
    if (fechaProgramada < hoy) return "Vencida";

    return "Pendiente";
  }

  getSeverity():
    | "success"
    | "secondary"
    | "info"
    | "warn"
    | "danger"
    | "contrast"
    | undefined {
    const estado = this.getEstadoLabel();

    switch (estado) {
      case "Completada":
        return "success";
      case "Pendiente":
        return "warn";
      case "Vencida":
        return "danger";
      default:
        return "info";
    }
  }
}
