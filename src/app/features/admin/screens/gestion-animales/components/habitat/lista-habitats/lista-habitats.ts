import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AdminHabitat } from "@app/features/admin/services/admin-habitat";
import { Loader } from "@app/shared/components";
import { DataView } from "primeng/dataview";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { TagModule } from "primeng/tag";

@Component({
  selector: "zoo-lista-habitats",
  imports: [AsyncPipe, Loader, DataView, ButtonModule, CardModule, TagModule],
  templateUrl: "./lista-habitats.html",
  styleUrl: "./lista-habitats.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListaHabitats {
  private habitatService = inject(AdminHabitat);
  private router = inject(Router);

  protected habitats$ = this.habitatService.getAllHabitats(0, 100);

  protected navigateToCreate(): void {
    this.router.navigate(["/admin/gestion-animales/habitat/crear"]);
  }

  protected editHabitat(id: number): void {
    // TODO: Implementar edición cuando se cree el componente
    console.log("Editar hábitat:", id);
  }

  protected deleteHabitat(id: number): void {
    // TODO: Implementar eliminación con confirmación
    console.log("Eliminar hábitat:", id);
  }

  protected getStatusSeverity(isActive: boolean): "success" | "danger" {
    return isActive ? "success" : "danger";
  }
}
