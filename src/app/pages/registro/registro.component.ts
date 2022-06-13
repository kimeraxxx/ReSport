import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsersAuthFireService } from 'src/app/services/users-auth-fire.service';
import { Usuario } from '../../Modelo/Usuario';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
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
  uid = '';
  subcrierUserInfo: Subscription;
  avisoError = false;
  formularioRegistro = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email,Validators.maxLength(50)]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    nombre: new FormControl('',[Validators.required,Validators.maxLength(50)]),
    apellido: new FormControl('',[Validators.required,Validators.maxLength(50)])
    
  })

  constructor(public fireBaseAuthService: UsersAuthFireService,
              public firestoreService: FirestoreService) {
                
              }

  async ngOnInit() {
    const uid = await this.fireBaseAuthService.getUid;
    console.log(uid);
  }
  async registrarse(){
    console.log(this.usuario.email, 'aqui las variables',this.usuario.contrasena );
    const credenciales={
      email: this.usuario.email,
      contrasena: this.usuario.contrasena
    };
    const res =  await this.fireBaseAuthService.registrarse(credenciales.email,credenciales.contrasena).catch(err => {
      console.log('error ->',err);
    });
    console.log(res);
    const uid = await this.fireBaseAuthService.getUid();
    this.usuario.uid = uid;
    this.guardarUser();

  }

 
  async guardarUser() {
    const path = 'Ciudadanos';
    const name = this.usuario.nombre;
    this.firestoreService.createElement(this.usuario,path,this.usuario.uid).then(res =>{
      console.log('Guardado con exito');
    }).catch(error=>{

    });
  }
  async cerrarSesion(){
    //const uid = await this.fireBaseAuthService.getUid;
    //console.log(uid);
     this.fireBaseAuthService.logout();
     this.subcrierUserInfo.unsubscribe();
  }
 

}
