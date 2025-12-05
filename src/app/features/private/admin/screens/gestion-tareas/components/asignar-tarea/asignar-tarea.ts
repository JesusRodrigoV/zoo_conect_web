import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  output,
  signal,
} from "@angular/core";
import { RolId, Usuario } from "@models/usuario";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { SelectModule } from "primeng/select";
import { FormsModule } from "@angular/forms";
import {
  FilterUsuarios,
  UserSelectOption,
} from "@app/features/private/admin/services/filter-usuarios";
import { debounceTime, Subject } from "rxjs";
import { NgClass } from "@angular/common";
import { AdminUsuarios } from "@app/features/private/admin/services/admin-usuarios";

interface CaretakerOption {
  label: string;
  value: number;
}

@Component({
  selector: "zoo-asignar-tarea",
  imports: [DialogModule, ButtonModule, SelectModule, FormsModule, NgClass],
  templateUrl: "./asignar-tarea.html",
  styleUrl: "./asignar-tarea.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsignarTarea {
  visible = input.required<boolean>();
  onConfirm = output<number>();
  onCancel = output<void>();

  private adminUsuarios = inject(AdminUsuarios);

  usuarios = signal<Usuario[]>([]);
  loadingUsuarios = signal(false);
  selectedUserId = signal<number | null>(null);

  constructor() {
    effect(() => {
      if (this.visible()) {
        this.loadUsers();
      } else {
        this.selectedUserId.set(null);
      }
    });
  }

  private loadUsers() {
    if (this.usuarios().length > 0) return;

    this.loadingUsuarios.set(true);
    this.adminUsuarios.getAllUsers(1, 100).subscribe({
      next: (res) => {
        const validUsers = res.items.filter(
          (u) => u.rol.id !== RolId.VISITANTE,
        );
        this.usuarios.set(validUsers);
      },
      error: (e) => console.error(e),
      complete: () => this.loadingUsuarios.set(false),
    });
  }

  confirm() {
    const userId = this.selectedUserId();
    if (userId) {
      this.onConfirm.emit(userId);
      this.selectedUserId.set(null);
    }
  }

  getRoleIconClass(roleId: RolId): string {
    switch (roleId) {
      case RolId.CUIDADOR:
        return "role-icon-cuidador";
      case RolId.VETERINARIO:
        return "role-icon-veterinario";
      default:
        return "role-icon-default";
    }
  }

  getRoleBadgeClass(roleId: RolId): string {
    switch (roleId) {
      case RolId.CUIDADOR:
        return "role-badge-cuidador";
      case RolId.VETERINARIO:
        return "role-badge-veterinario";
      default:
        return "role-badge-default";
    }
  }
}
