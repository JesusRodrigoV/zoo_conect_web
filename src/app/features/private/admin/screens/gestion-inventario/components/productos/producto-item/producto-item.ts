import { Producto } from "@app/features/private/admin/models/productos.model";
import { DecimalPipe, NgClass, NgOptimizedImage } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TagModule } from "primeng/tag";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: "zoo-producto-item",
  imports: [
    NgClass,
    ButtonModule,
    TagModule,
    TooltipModule,
    NgOptimizedImage,
    DecimalPipe,
  ],
  templateUrl: "./producto-item.html",
  styleUrl: "./producto-item.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductoItem {
  product = input.required<Producto>();
  layout = input.required<"list" | "grid">();

  onEdit = output<number>();
  onDelete = output<number>();
}
