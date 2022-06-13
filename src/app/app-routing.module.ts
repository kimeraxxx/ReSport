import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { HomeComponent } from './pages/home/home.component';
import { PistasComponent } from './pages/pistas/pistas.component';
import { Reservas7Component } from './pages/reservas7/reservas7.component';

const routes: Routes = [
 
  {
    path: 'pistas/:pistaId',
    component: PistasComponent
  },
  // {
  //   path: 'pistas',
  //   component: PistasComponent
  // },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reservas',
    component: Reservas7Component
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
