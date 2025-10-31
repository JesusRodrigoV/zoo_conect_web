import { Routes } from "@angular/router";
import { authGuard, loggedGuard, veterinaryGuard } from "./core/guards";
import { cuidadorGuard } from "./core/guards/cuidador-guard";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./core/layout/layout"),
    children: [
      {
        path: "inicio",
        loadComponent: () => import("./features/home/home"),
      },
      {
        path: "perfil",
        loadComponent: () => import("./features/profile/profile"),
        canActivate: [authGuard],
      },
      {
        path: "servicios",
        loadComponent: () =>
          import("./features/servicios/screens/servicios/servicios"),
      },
      {
        path: "ajustes",
        loadComponent: () => import("./features/settings/settings"),
        canActivate: [authGuard],
        children: [
          {
            path: "",
            redirectTo: "perfil",
            pathMatch: "full",
          },
          {
            path: "perfil",
            loadComponent: () =>
              import(
                "./features/settings/components/perfil-ajustes/perfil-ajustes"
              ),
            data: { title: "Perfil" },
          },
          {
            path: "seguridad",
            loadComponent: () =>
              import(
                "./features/settings/components/seguridad-ajustes/seguridad-ajustes"
              ),
            data: { title: "Seguridad" },
          },
          {
            path: "notificaciones",
            loadComponent: () =>
              import(
                "./features/settings/components/notificaciones-ajustes/notificaciones-ajustes"
              ),
            data: { title: "Notificaciones" },
          },
        ],
      },
      {
        path: "encuestas",
        loadComponent: () =>
          import("./features/encuestas/screens/encuestas/encuestas"),
        children: [],
      },
      {
        path: "encuestas/:id",
        loadComponent: () =>
          import(
            "./features/encuestas/screens/encuesta-detalle/encuesta-detalle"
          ),
      },
      {
        path: "quizzes",
        loadComponent: () =>
          import("./features/quizzes/screens/quizzes/quizzes"),
      },
      {
        path: "acerca-de",
        loadComponent: () => import("./features/about/about"),
      },
      {
        path: "animales",
        loadComponent: () =>
          import("./features/animales/screens/animales/animales"),
      },
      {
        path: "",
        redirectTo: "inicio",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    canActivateChild: [loggedGuard],
    children: [
      {
        path: "login",
        loadComponent: () => import("./features/auth/pages/login/login"),
      },
      {
        path: "signup",
        loadComponent: () => import("./features/auth/pages/signup/signup"),
      },
      {
        path: "forgot-password",
        loadComponent: () =>
          import("./features/auth/pages/forgot-password/forgot-password"),
      },
      {
        path: "reset-password",
        loadComponent: () =>
          import("./features/auth/pages/reset-password/reset-password"),
      },
      {
        path: "verify-2fa",
        loadComponent: () =>
          import("./features/auth/pages/two-factor/two-factor"),
      },
    ],
  },
  {
    path: "admin",
    loadComponent: () =>
      import("./features/admin/layout/admin-layout/admin-layout"),
    canActivate: [authGuard],
    children: [
      {
        path: "usuarios",
        loadComponent: () =>
          import("./features/admin/screens/gestion-usuarios/gestion-usuarios"),
        children: [
          {
            path: "crear",
            loadComponent: () =>
              import(
                "./features/admin/screens/gestion-usuarios/components/crear-usuario/crear-usuario"
              ),
          },
          {
            path: "lista",
            loadComponent: () =>
              import(
                "./features/admin/screens/gestion-usuarios/components/lista-usuarios/lista-usuarios"
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
        loadComponent: () =>
          import("./features/admin/screens/gestion-animales/gestion-animales"),
        children: [
          {
            path: "crear",
            loadComponent: () =>
              import(
                "./features/admin/screens/gestion-animales/components/animales/crear-animal/crear-animal"
              ),
          },
          {
            path: "lista",
            loadComponent: () =>
              import(
                "./features/admin/screens/gestion-animales/components/animales/lista-animales/lista-animales"
              ),
          },
          {
            path: "especies",
            children: [
              {
                path: "crear",
                loadComponent: () =>
                  import(
                    "./features/admin/screens/gestion-animales/components/especies/crear-especie/crear-especie"
                  ),
              },
              {
                path: "lista",
                loadComponent: () =>
                  import(
                    "./features/admin/screens/gestion-animales/components/especies/lista-especies/lista-especies"
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
                    "./features/admin/screens/gestion-animales/components/habitat/crear-habitat/crear-habitat"
                  ),
              },
              {
                path: "lista",
                loadComponent: () =>
                  import(
                    "./features/admin/screens/gestion-animales/components/habitat/lista-habitats/lista-habitats"
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
        loadComponent: () =>
          import("./features/admin/screens/dashboard/dashboard"),
      },
      {
        path: "encuestas",
        loadComponent: () =>
          import(
            "./features/admin/screens/gestion-encuestas/gestion-encuestas"
          ),
        children: [
          { path: "", redirectTo: "lista", pathMatch: "full" },
          {
            path: "crear",
            loadComponent: () =>
              import(
                "./features/admin/screens/gestion-encuestas/components/crear-encuesta/crear-encuesta"
              ),
          },
          {
            path: "lista",
            loadComponent: () =>
              import(
                "./features/admin/screens/gestion-encuestas/components/lista-encuestas/lista-encuestas"
              ),
          },
        ],
      },
      {
        path: "quizzes",
        loadComponent: () =>
          import("./features/admin/screens/gestion-quizzes/gestion-quizzes"),
        children: [
          {
            path: "crear",
            loadComponent: () =>
              import(
                "./features/admin/screens/gestion-quizzes/components/crear-quiz/crear-quiz"
              ),
          },
          {
            path: "lista",
            loadComponent: () =>
              import(
                "./features/admin/screens/gestion-quizzes/components/lista-quizzes/lista-quizzes"
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
        loadComponent: () =>
          import("./features/admin/screens/gestion-reportes/gestion-reportes"),
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "vet",
    loadComponent: () => import("./features/veterinario/veterinario"),
    canActivate: [veterinaryGuard],
  },
  {
    path: "cuidador",
    loadComponent: () => import("./features/cuidador/cuidador"),
    canActivate: [cuidadorGuard],
  },
  {
    path: "404",
    loadComponent: () => import("./features/not-found/not-found"),
  },
  {
    path: "**",
    redirectTo: "404",
  },
];
