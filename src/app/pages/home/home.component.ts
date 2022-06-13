import { Component, OnInit } from '@angular/core';
import { Pista } from 'src/app/Modelo/Pista';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private path = 'Pistas/';
  pistas: Pista[];
  
  

  constructor(public firestoreService: FirestoreService) { }

  ngOnInit() {
    this.getPistas();
  }

  getPistas(){
    this.firestoreService.getCollection<Pista>(this.path).subscribe(res=>{
      console.log(res);
      this.pistas = res;
    });
  }

}
