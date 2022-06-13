import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class UsersAuthFireService {

  constructor(public auth: AngularFireAuth) {
    this.getUid();
   }
  login(email: string,contrasena: string) {
    return this.auth.signInWithEmailAndPassword(email, contrasena);
  }
  registrarse(email: string,contrasena: string) {
    return this.auth.createUserWithEmailAndPassword(email, contrasena);
  }
  logout() {
     return this.auth.signOut();
  }
  async getUid(){
    const user = await this.auth.currentUser;
    if(user === null){
      return null;
    }else{
        return user.uid;
      }
    }
  stateAuth(){
    return this.auth.authState;
  }
}
