import { NgClass } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  signal,
} from "@angular/core";
import { Loader } from "@app/shared/components";
import { DataView, DataViewPageEvent } from "primeng/dataview";
import { QuizItem } from "../quiz-item";
import { ButtonModule } from "primeng/button";
import { Router, RouterLink } from "@angular/router";
import { AdminQuizzes } from "@app/features/private/admin/services/admin-quizzes";
import { ShowToast } from "@app/shared/services";
import { ConfirmationService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DrawerModule } from "primeng/drawer";
import { TooltipModule } from "primeng/tooltip";
import { QuizDetalle } from "../quiz-detalle";
import { SelectButtonModule } from "primeng/selectbutton";
import { FormsModule } from "@angular/forms";
import { PaginatedResponse } from "@models/common";
import { Trivia } from "@models/quiz";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { finalize } from "rxjs";

@Component({
  selector: "zoo-lista-quizzes",
  imports: [
    Loader,
    DataView,
    ButtonModule,
    RouterLink,
    QuizItem,
    ConfirmDialogModule,
    DrawerModule,
    TooltipModule,
    QuizDetalle,
    SelectButtonModule,
    NgClass,
    FormsModule,
  ],
  providers: [ConfirmationService],
  templateUrl: "./lista-quizzes.html",
  styleUrl: "../../../lista-styles.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListaQuizzes {
  private readonly quizService = inject(AdminQuizzes);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastService = inject(ShowToast);
  private readonly confirmationService = inject(ConfirmationService);

  protected readonly currentPage = signal(1);
  protected readonly pageSize = signal(10);
  protected readonly quizData = signal<PaginatedResponse<Trivia> | null>(null);
  protected readonly loading = signal<boolean>(true);
  protected readonly error = signal<string | null>(null);

  protected readonly detalleVisible = signal(false);
  protected readonly idDetalleSeleccionado = signal<number | null>(null);
  protected readonly layout = signal<"list" | "grid">("list");
  protected readonly options = ["list", "grid"];

  constructor() {
    effect(() => {
      const page = this.currentPage();
      const size = this.pageSize();
      this.loadQuizzes(page, size);
    });
  }

  protected loadQuizzes(page: number, size: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.quizService
      .getAllTrivias(page, size)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (response) => {
          this.quizData.set(response);
        },
        error: (err) => {
          console.error("Error al cargar quizzes:", err);
          this.error.set(
            err.message || "Ocurrió un error al cargar los quizzes.",
          );
          this.quizData.set(null);
        },
      });
  }

  protected onPageChange(event: DataViewPageEvent): void {
    const nextPage = event.first / event.rows + 1;
    if (nextPage !== this.currentPage()) {
      this.currentPage.set(nextPage);
    }
    if (event.rows !== this.pageSize()) {
      this.pageSize.set(event.rows);
    }
  }

  protected viewDetails(id: number): void {
    this.idDetalleSeleccionado.set(id);
    this.detalleVisible.set(true);
  }

  protected deleteQuiz(id: number): void {
    this.confirmationService.confirm({
      message:
        "¿Estás seguro de eliminar este quiz? Esta acción es permanente.",
      header: "Confirmar eliminación",
      icon: "pi pi-exclamation-triangle",
      acceptButtonProps: {
        label: "Eliminar",
        severity: "danger",
        rounded: true,
      },
      rejectButtonProps: {
        label: "Cancelar",
        variant: "outlined",
        rounded: true,
      },
      accept: () => {
        this.onDeleteConfirm(id);
      },
    });
  }

  private onDeleteConfirm(id: number): void {
    this.loading.set(true);
    //TODO: agregar el metodo de elminiar quiz o por lo menos desactivar de la vista
  }

  private actualizarSignalTrasBorrado(id: number): void {
    this.quizData.update((currentData) => {
      if (!currentData) return null;

      const updatedItems = currentData.items.filter((item) => item.id !== id);

      if (updatedItems.length === 0 && this.currentPage() > 1) {
        this.currentPage.update((page) => page - 1);
      }

      return {
        ...currentData,
        items: updatedItems,
        total: currentData.total - 1,
      };
    });
  }
}
