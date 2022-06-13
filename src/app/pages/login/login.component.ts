import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/Modelo/Usuario';
import { UsersAuthFireService } from 'src/app/services/users-auth-fire.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario={
    uid: '',
    nombre: '',
    apellido: '',
    telefono: null,
    email: '',
    contrasena: '',
    ciudad: '',
    reserva: null,
    hora: null
  };
  avisoError = false;
  formularioLogin = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email,Validators.maxLength(50)]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)])
  })

  constructor(public fireauthService: UsersAuthFireService, public toastController: ToastController,public router: Router) { }

  ngOnInit() {}

  iniciarSesion(){
    this.avisoError = true;
    const credenciales={
      email: this.formularioLogin.get('email').value,
      contrasena: this.formularioLogin.get('password').value,
    };
    if (this.formularioLogin.valid) {
      this.fireauthService.login(credenciales.email,credenciales.contrasena).then(res=>{
        console.log('Inicio de sesión correcto -> ',res);

      });
      
    }else{
      this.errorAlert();

    }
  }

  async errorAlert() {
    const toast = await this.toastController.create({
      message: 'Credenciales Incorrectas',
      duration: 1000,
      icon: 'information-circle',
      cssClass:'primary'
    });
    await toast.present();
  }

}
