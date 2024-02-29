import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IsLoggedGuard} from "./guards/is-logged/is-logged.guard";

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},
  {
    path: 'diary',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule),
    canLoad: [IsLoggedGuard],
    canActivate: [IsLoggedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
