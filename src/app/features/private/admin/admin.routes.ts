import { Routes } from "@angular/router";

export default [
  {
    path: "usuarios",
    title: "Gestión de Usuarios",
    loadComponent: () => import("./screens/gestion-usuarios/gestion-usuarios"),
    children: [
      {
        path: "crear",
        title: "Crear Usuario",
        loadComponent: () =>
          import(
            "./screens/gestion-usuarios/components/crear-usuario/crear-usuario"
          ),
      },
      {
        path: "editar/:id",
        title: "Editar Usuario",
        loadComponent: () =>
          import(
            "./screens/gestion-usuarios/components/crear-usuario/crear-usuario"
          ),
      },
      {
        path: "lista",
        title: "Lista de Usuarios",
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
    title: "Gestión de Animales",
    loadComponent: () => import("./screens/gestion-animales/gestion-animales"),
    children: [
      {
        path: "crear",
        title: "Crear Animal",
        loadComponent: () =>
          import(
            "./screens/gestion-animales/components/animales/crear-animal/crear-animal"
          ),
      },
      {
        path: "editar/:id",
        title: "Editar Animal",
        loadComponent: () =>
          import(
            "./screens/gestion-animales/components/animales/crear-animal/crear-animal"
          ),
      },
      {
        path: "lista",
        title: "Lista de Animales",
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
            title: "Crear Especie",
            loadComponent: () =>
              import(
                "./screens/gestion-animales/components/especies/crear-especie/crear-especie"
              ),
          },
          {
            path: "editar/:id",
            title: "Editar Especie",
            loadComponent: () =>
              import(
                "./screens/gestion-animales/components/especies/crear-especie/crear-especie"
              ),
          },
          {
            path: "lista",
            title: "Lista de Especies",
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
            title: "Crear Habitat",
            loadComponent: () =>
              import(
                "./screens/gestion-animales/components/habitat/crear-habitat/crear-habitat"
              ),
          },
          {
            path: "editar/:id",
            title: "Editar Habitat",
            loadComponent: () =>
              import(
                "./screens/gestion-animales/components/habitat/crear-habitat/crear-habitat"
              ),
          },
          {
            path: "lista",
            title: "Lista de Habitats",
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
    title: "Dashboard",
    loadComponent: () => import("./screens/dashboard/dashboard"),
  },
  {
    path: "encuestas",
    title: "Encuestas",
    loadComponent: () =>
      import("./screens/gestion-encuestas/gestion-encuestas"),
    children: [
      { path: "", redirectTo: "lista", pathMatch: "full" },
      {
        path: "crear",
        title: "Crear Encuesta",
        loadComponent: () =>
          import(
            "./screens/gestion-encuestas/components/crear-encuesta/crear-encuesta"
          ),
      },
      {
        path: "editar/:id",
        title: "Editar Encuesta",
        loadComponent: () =>
          import(
            "./screens/gestion-encuestas/components/crear-encuesta/crear-encuesta"
          ),
      },
      {
        path: "lista",
        title: "Lista de Encuestas",
        loadComponent: () =>
          import(
            "./screens/gestion-encuestas/components/lista-encuestas/lista-encuestas"
          ),
      },
      {
        path: "stats/:id",
        title: "Estadísticas de Encuesta",
        loadComponent: () =>
          import(
            "./screens/gestion-encuestas/components/encuesta-stats/encuesta-stats"
          ),
      },
    ],
  },
  {
    path: "quizzes",
    title: "Gestión de Encuestas",
    loadComponent: () => import("./screens/gestion-quizzes/gestion-quizzes"),
    children: [
      {
        path: "crear",
        title: "Crear Encuesta",
        loadComponent: () =>
          import("./screens/gestion-quizzes/components/crear-quiz/crear-quiz"),
      },
      {
        path: "editar/:id",
        title: "Editar Encuesta",
        loadComponent: () =>
          import("./screens/gestion-quizzes/components/crear-quiz/crear-quiz"),
      },
      {
        path: "lista",
        title: "Lista de Encuestas",
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
    title: "Gestión de Reportes",
    loadComponent: () => import("./screens/gestion-reportes/gestion-reportes"),
  },
  {
    path: "audit",
    title: "Auditoría",
    loadComponent: () => import("./screens/auditoria/auditoria"),
  },
  {
    path: "inventario",
    loadComponent: () =>
      import("./screens/gestion-inventario/gestion-inventario"),
    children: [
      {
        path: "crear",
        loadComponent: () =>
          import(
            "./screens/gestion-inventario/components/productos/crear-producto/crear-producto"
          ),
      },
      {
        path: "editar/:id",
        loadComponent: () =>
          import(
            "./screens/gestion-inventario/components/productos/crear-producto/crear-producto"
          ),
      },
      {
        path: "lista",
        loadComponent: () =>
          import(
            "./screens/gestion-inventario/components/productos/lista-producto/lista-producto"
          ),
      },
      {
        path: "tipo",
        children: [
          {
            path: "lista",
            loadComponent: () =>
              import(
                "./screens/gestion-inventario/components/tipo-productos/lista-tipos/lista-tipos"
              ),
          },
          {
            path: "crear",
            loadComponent: () =>
              import(
                "./screens/gestion-inventario/components/tipo-productos/crear-tipo/crear-tipo"
              ),
          },
          {
            path: "editar/:id",
            loadComponent: () =>
              import(
                "./screens/gestion-inventario/components/tipo-productos/crear-tipo/crear-tipo"
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
        path: "proveedor",
        children: [
          {
            path: "lista",
            loadComponent: () =>
              import(
                "./screens/gestion-inventario/components/proveedor/lista-proveedor/lista-proveedor"
              ),
          },
          {
            path: "crear",
            loadComponent: () =>
              import(
                "./screens/gestion-inventario/components/proveedor/crear-proveedor/crear-proveedor"
              ),
          },
          {
            path: "editar/:id",
            loadComponent: () =>
              import(
                "./screens/gestion-inventario/components/proveedor/crear-proveedor/crear-proveedor"
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
        path: "unidades",
        children: [
          {
            path: "lista",
            loadComponent: () =>
              import(
                "./screens/gestion-inventario/components/unidades-medida/lista-unidad/lista-unidad"
              ),
          },
          {
            path: "crear",
            loadComponent: () =>
              import(
                "./screens/gestion-inventario/components/unidades-medida/crear-unidad/crear-unidad"
              ),
          },
          {
            path: "editar/:id",
            loadComponent: () =>
              import(
                "./screens/gestion-inventario/components/unidades-medida/crear-unidad/crear-unidad"
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
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
] as Routes;
