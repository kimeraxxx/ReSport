import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { Subscription } from 'rxjs/internal/Subscription';
import { Usuario } from 'src/app/Modelo/Usuario';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsersAuthFireService } from 'src/app/services/users-auth-fire.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  subcrierUserInfo: Subscription;
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
  uid: string;



  constructor(public fireBaseAuthService:UsersAuthFireService,public firestoreService: FirestoreService,public toastController: ToastController) {
    this.fireBaseAuthService.stateAuth().subscribe(res =>{
      console.log(res);
      if(res !== null){
        this.uid= res.uid;
        this.getUserInfo(this.uid);
      }else{
        this.initCliente();
      };
    });
   }

  ngOnInit() {
    this.uid = getAuth().currentUser.uid;
    this.getUser();

  }

  async cerrarSesion(){
    //const uid = await this.fireBaseAuthService.getUid;
    //console.log(uid);
     this.fireBaseAuthService.logout();
     this.subcrierUserInfo.unsubscribe();
  }
  getUser(){
    const path = 'Ciudadanos'

    this.firestoreService.getElement<Usuario>(path,this.uid).subscribe( response => {
            this.usuario = response;});
  }
  getUserInfo(uid: string){
    const path = 'Ciudadanos';
    this.subcrierUserInfo= this.firestoreService.getElement<Usuario>(path,uid).subscribe(res =>{
      this.usuario = res;

    });

  }
  initCliente(){
    this.uid = '';
    this.usuario={
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
  }
  actualizarPerfil(){
    const path = 'Ciudadanos'
    this.firestoreService.updateElement(this.usuario,path,this.uid)
    this.saveChanges();
  }
  async saveChanges() {
    const toast = await this.toastController.create({
      message: 'Datos cambiados correctamente',
      duration: 1000,
      icon: 'information-circle',
      cssClass:'primary'
    });
    await toast.present();
  }

}
