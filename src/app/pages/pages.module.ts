import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { PistasComponent } from './pistas/pistas.component';
import { Reservas7Component } from './reservas7/reservas7.component';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    PistasComponent,
    Reservas7Component,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    
  ]
})
export class PagesModule { }
