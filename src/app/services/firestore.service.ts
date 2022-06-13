/* eslint-disable arrow-body-style */
import { Injectable, platformCore } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Pista } from '../Modelo/Pista';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
pistas: Pista[];
  constructor(public database: AngularFirestore) { }

  createElement(data: any ,path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);

  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  getElement<tipo>(path: string, id: string){
    const collection = this.database.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }
  deleteElement(path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }
  updateElement(data: any ,path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }
  getId(){
    return this.database.createId();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  getCollection<tipo>(path: string){
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }

  getPistaId(pistaId: string){
    return{
      ...this.pistas.find(pista =>{
        return pista.uid === pistaId;
      })
    };
  }
}
