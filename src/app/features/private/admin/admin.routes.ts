import { Routes } from "@angular/router";

export default [
  {
    path: "usuarios",
    loadComponent: () => import("./screens/gestion-usuarios/gestion-usuarios"),
    children: [
      {
        path: "crear",
        loadComponent: () =>
          import(
            "./screens/gestion-usuarios/components/crear-usuario/crear-usuario"
          ),
      },
      {
        path: "editar/:id",
        loadComponent: () =>
          import(
            "./screens/gestion-usuarios/components/crear-usuario/crear-usuario"
          ),
      },
      {
        path: "lista",
        loadComponent: () =>
          import(
            "./screens/gestion-usuarios/components/lista-usuarios/lista-usuarios"
          ),
      },
      {
        path: "",
        redirectTo: "lista",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "animales",
    loadComponent: () => import("./screens/gestion-animales/gestion-animales"),
    children: [
      {
        path: "crear",
        loadComponent: () =>
          import(
            "./screens/gestion-animales/components/animales/crear-animal/crear-animal"
          ),
      },
      {
        path: "editar/:id",
        loadComponent: () =>
          import(
            "./screens/gestion-animales/components/animales/crear-animal/crear-animal"
          ),
      },
      {
        path: "lista",
        loadComponent: () =>
          import(
            "./screens/gestion-animales/components/animales/lista-animales/lista-animales"
          ),
      },
      {
        path: "especies",
        children: [
          {
            path: "crear",
            loadComponent: () =>
              import(
                "./screens/gestion-animales/components/especies/crear-especie/crear-especie"
              ),
          },
          {
            path: "editar/:id",
            loadComponent: () =>
              import(
                "./screens/gestion-animales/components/especies/crear-especie/crear-especie"
              ),
          },
          {
            path: "lista",
            loadComponent: () =>
              import(
                "./screens/gestion-animales/components/especies/lista-especies/lista-especies"
              ),
          },
          {
            path: "",
            redirectTo: "lista",
            pathMatch: "full",
          },
        ],
      },
      {
        path: "habitat",
        children: [
          {
            path: "crear",
            loadComponent: () =>
              import(
                "./screens/gestion-animales/components/habitat/crear-habitat/crear-habitat"
              ),
          },
          {
            path: "editar/:id",
            loadComponent: () =>
              import(
                "./screens/gestion-animales/components/habitat/crear-habitat/crear-habitat"
              ),
          },
          {
            path: "lista",
            loadComponent: () =>
              import(
                "./screens/gestion-animales/components/habitat/lista-habitats/lista-habitats"
              ),
          },
          {
            path: "",
            redirectTo: "lista",
            pathMatch: "full",
          },
        ],
      },
      {
        path: "",
        redirectTo: "lista",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "dashboard",
    loadComponent: () => import("./screens/dashboard/dashboard"),
  },
  {
    path: "encuestas",
    loadComponent: () =>
      import("./screens/gestion-encuestas/gestion-encuestas"),
    children: [
      { path: "", redirectTo: "lista", pathMatch: "full" },
      {
        path: "crear",
        loadComponent: () =>
          import(
            "./screens/gestion-encuestas/components/crear-encuesta/crear-encuesta"
          ),
      },
      {
        path: "editar/:id",
        loadComponent: () =>
          import(
            "./screens/gestion-encuestas/components/crear-encuesta/crear-encuesta"
          ),
      },
      {
        path: "lista",
        loadComponent: () =>
          import(
            "./screens/gestion-encuestas/components/lista-encuestas/lista-encuestas"
          ),
      },
    ],
  },
  {
    path: "quizzes",
    loadComponent: () => import("./screens/gestion-quizzes/gestion-quizzes"),
    children: [
      {
        path: "crear",
        loadComponent: () =>
          import("./screens/gestion-quizzes/components/crear-quiz/crear-quiz"),
      },
      {
        path: "editar/:id",
        loadComponent: () =>
          import("./screens/gestion-quizzes/components/crear-quiz/crear-quiz"),
      },
      {
        path: "lista",
        loadComponent: () =>
          import(
            "./screens/gestion-quizzes/components/lista-quizzes/lista-quizzes"
          ),
      },
      {
        path: "",
        redirectTo: "lista",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "reportes",
    loadComponent: () => import("./screens/gestion-reportes/gestion-reportes"),
  },
  {
    path: "audit",
    loadComponent: () => import("./screens/auditoria/auditoria"),
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
] as Routes;
