import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { Tarea } from "@app/features/private/admin/models/tareas/tarea.model";
import { EjecucionTareas } from "../services/ejecucion-tareas";

type MisTareasState = {
  tareas: Tarea[];
  loading: boolean;
  saving: boolean;
  error: string | null;
};

const initialState: MisTareasState = {
  tareas: [],
  loading: false,
  saving: false,
  error: null,
};

export const MisTareasStore = signalStore(
  { providedIn: "root" },
  withState(initialState),

  withMethods((store, ejecucionService = inject(EjecucionTareas)) => ({
    loadMisTareas: rxMethod<{ completadas?: boolean }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ completadas = false }) =>
          ejecucionService.getMyTasks(1, 50, completadas).pipe(
            tapResponse({
              next: (res) =>
                patchState(store, {
                  tareas: res.items,
                  loading: false,
                }),
              error: (err: any) =>
                patchState(store, {
                  loading: false,
                  error: err?.error?.message || "Error cargando tus tareas",
                }),
            }),
          ),
        ),
      ),
    ),

    completarTareaSimple: rxMethod<{ id: number; data: any }>(
      pipe(
        tap(() => patchState(store, { saving: true })),
        switchMap(({ id, data }) =>
          ejecucionService.completeSimpleTask(id, data).pipe(
            tapResponse({
              next: (tareaCompletada) => {
                patchState(store, (state) => ({
                  tareas: state.tareas.map((t) =>
                    t.id === id ? { ...tareaCompletada, completada: true } : t,
                  ),
                  saving: false,
                }));
              },
              error: (err: any) =>
                patchState(store, {
                  saving: false,
                  error: err?.error?.message || "Error al completar tarea",
                }),
            }),
          ),
        ),
      ),
    ),

    // Puedes agregar completar alimentación igual
  })),
);
