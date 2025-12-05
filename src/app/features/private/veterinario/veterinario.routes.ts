import { Routes } from "@angular/router";

export default [
  {
    path: "dashboard",
    title: "Dashboard Veterinario",
    loadComponent: () => import("./dashboard/dashboard"),
  },
  {
    path: "dietas",
    loadComponent: () => import("./gestion-dietas/gestion-dietas"),
    children: [
      {
        path: "",
        redirectTo: "lista",
        pathMatch: "full",
      },
      {
        path: "crear",
        loadComponent: () =>
          import("./gestion-dietas/components/crear-dieta/crear-dieta"),
      },
      {
        path: "editar/:id",
        loadComponent: () =>
          import("./gestion-dietas/components/crear-dieta/crear-dieta"),
      },
      {
        path: "lista",
        title: "Lista de Dietas",
        loadComponent: () =>
          import("./gestion-dietas/components/lista-dietas/lista-dietas"),
      },
    ],
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
] as Routes;
