import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;
  currentUser: any;

  constructor(
    public afAuth: AngularFireAuth,

  ) { 
    this.AgregarIsLogged();
  }

  AgregarIsLogged(){
    this.afAuth.authState.subscribe(user =>(this.isLogged = user));
  }

  async sendVerificationEmail():Promise<void>{
    //borre un await antes del return
    return await (await this.afAuth.currentUser).sendEmailVerification();
  }

  async login(email: any, pass: any){
    return await this.afAuth.signInWithEmailAndPassword(email,pass);
  }

  async registerUsuario(usuario: Usuario){
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(usuario.mail,usuario.pass);
      this.sendVerificationEmail();
      return result;
    } catch (error) {
      window.alert(error.message);
    }
  }

  logout(){
    return this.afAuth.signOut();
  }

  
}
