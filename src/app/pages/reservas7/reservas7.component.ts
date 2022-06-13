import { Component, OnInit } from '@angular/core';
import { getAuth, getIdToken } from 'firebase/auth';
import { Subscription } from 'rxjs/internal/Subscription';
import { Usuario } from 'src/app/Modelo/Usuario';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsersAuthFireService } from 'src/app/services/users-auth-fire.service';

@Component({
  selector: 'app-reservas7',
  templateUrl: './reservas7.component.html',
  styleUrls: ['./reservas7.component.scss'],
})
export class Reservas7Component implements OnInit {
  
  usuario: Usuario={
    uid: '',
    nombre: '',
    apellido: '',
    telefono: null,
    email: '',
    contrasena: '',
    ciudad: '',
    reserva: null,
    hora: ''

  };

  uid: string;
  subcrierUserInfo: Subscription;
  // idPistaActual = this.usuario.reserva.uid
 
  


  constructor(public fireBaseAuthService: UsersAuthFireService,public firestoreService: FirestoreService) {
    // this.fireBaseAuthService.stateAuth().subscribe(res =>{
    //   console.log(res);
    //   if(res !== null){
    //     this.uid= res.uid;
    //     this.getUserInfo(this.uid);
    //   }else{
    //     this.initCliente();
    //   };
    // });
  }

  async ngOnInit() {
    this.uid = getAuth().currentUser.uid
    this.getId
    console.log(this.uid);
    this.getUser();
    
    

    // this.getPista();
  
    console.log("ERROR", this.uid);
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
getUserInfo(uid: string){
  const path = 'Ciudadanos';
  this.subcrierUserInfo= this.firestoreService.getElement<Usuario>(path,uid).subscribe(res =>{
    this.usuario = res;
  });
}

async getId(){
 
}
// getPista(){
//   const path = 'Pistas'

//   this.firestoreService.getElement<Pista>(path,this.idPistaActual).subscribe(res =>{
//     this.pista = res
//   });
// }
async getUser(){
  const path = 'Ciudadanos'
  await this.firestoreService.getElement<Usuario>(path,this.uid).subscribe( response => {
          this.usuario = response
          console.log("INFO",response);});
}

}
