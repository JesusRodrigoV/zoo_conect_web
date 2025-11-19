import { Routes } from "@angular/router";

export default [
  {
    path: "login",
    loadComponent: () => import("./pages/login/login"),
  },
  {
    path: "signup",
    loadComponent: () => import("./pages/signup/signup"),
  },
  {
    path: "forgot-password",
    loadComponent: () => import("./pages/forgot-password/forgot-password"),
  },
  {
    path: "reset-password",
    loadComponent: () => import("./pages/reset-password/reset-password"),
  },
  {
    path: "verify-2fa",
    loadComponent: () => import("./pages/two-factor/two-factor"),
  },
] as Routes;
