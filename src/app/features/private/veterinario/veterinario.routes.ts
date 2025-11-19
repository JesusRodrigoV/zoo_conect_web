import { Routes } from "@angular/router";

export default [
    {
        path: 'dashboard',
        loadComponent: ()=> import("./dashboard/dashboard")
    },
] as Routes;
