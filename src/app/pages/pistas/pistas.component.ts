import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Pista } from '../../Modelo/Pista';
import { Usuario } from '../../Modelo/Usuario';
import { ActivatedRoute } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Console } from 'console';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-pistas',
  templateUrl: './pistas.component.html',
  styleUrls: ['./pistas.component.scss'],
})
export class PistasComponent implements OnInit {

  usuario: Usuario;
  private path = 'Pistas/';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  pista : Pista={
    uid: '',
    nombre: '',
    deporte: '',
    foto: '',
    descripcion: ''
};
  idPistaActual: string;
  uid: string;
  fecha: string= new Date().toISOString();
  hora: string= this.fecha

  constructor(private aRouter: ActivatedRoute, public firestoreService: FirestoreService,public toastController: ToastController) { }

  ngOnInit() {
    this.uid = getAuth().currentUser.uid;
    console.log(this.uid)
    this.getUser();

    
    this.idPistaActual = this.aRouter.snapshot.params['pistaId']
    this.firestoreService.getElement<Pista>(this.path,this.idPistaActual).subscribe(res =>{
      this.pista = res
    });

    console.log("ERROR", this.idPistaActual)
    // this.aRouter.paramMap.subscribe(paramMap =>{
      //redirect
    // const recibirId=  paramMap.get('pistaId')
    // this.pista=this.firestoreService.getPistaId(recibirId)
    // console.log(this.pista)
  // })

  }
  getUser(){
    const path = 'Ciudadanos'

    this.firestoreService.getElement<Usuario>(path,this.uid).subscribe( response => {
            this.usuario = response;});
  }
  guardarReserva(){
    const path = 'Ciudadanos'
    this.usuario.hora = this.hora;
    console.log(this.hora);
    
    this.usuario.reserva = this.pista
    console.log( "INFO",this.pista)
    console.log("NFO2",this.usuario.reserva)
    this.firestoreService.updateElement(this.usuario,path,this.uid)
    this.avisoReserva();
  }

  async avisoReserva() {
    const toast = await this.toastController.create({
      message: 'Reserva hecha correctamente',
      duration: 1000,
      icon: 'information-circle',
      cssClass:'primary'
    });
    await toast.present();
  }



}


