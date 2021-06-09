import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Usuario } from '../clases/usuario';
import { Especialidades } from '../clases/especialidades';

import * as firebase from 'firebase';

import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class FireService {

  //Usuarios
  rutaDeLaColeccion = "/usuarios";
  referenciaAlaColeccionPacientes: AngularFirestoreCollection<Usuario>;

  //especialidades
  rutaDeLaColeccionEsp = "/especialidades";
  referenciaAlaColeccionEsp: AngularFirestoreCollection<Especialidades>;

  referenciaFoto: any;

  constructor(
    private bd: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router,
    private auth: AuthService) {
    this.referenciaAlaColeccionPacientes = bd.collection(this.rutaDeLaColeccion);
    this.referenciaAlaColeccionEsp = bd.collection(this.rutaDeLaColeccionEsp);
  }

  GuardarUsuario(usuario: Usuario) {
    return this.referenciaAlaColeccionPacientes.add({ ...usuario });
  }

  GuardarEspecialidad(especialidad: Especialidades) {
    return this.referenciaAlaColeccionEsp.add({ ...especialidad });
  }

  GetEspecialidades(): AngularFirestoreCollection<Especialidades> {
    return this.referenciaAlaColeccionEsp;
  }

  GetUsuarios(): AngularFirestoreCollection<Usuario> {
    return this.referenciaAlaColeccionPacientes;
  }


  public AgregarUno(usuario: any, foto1: any, foto2?: any): boolean {
    let fotoCargada1;
    let fotoCargada2;

    let retorno = false;

    this.auth.registerUsuario(usuario).then((response) => {

      usuario.id = response.user.uid;

      if (foto2 != null) {
        const filePath = `/fotos/${usuario.mail}/1.png`;
        const ref = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, foto1).then(() => {

          const filePath2 = `/fotos/${usuario.mail}/2.png`;
          const ref2 = this.storage.ref(filePath2);
          const task2 = this.storage.upload(filePath2, foto2).then(() => {

            let storages = firebase.default.storage();
            let storageRef = storages.ref();
            let spaceRef = storageRef.child(filePath);

            let storages2 = firebase.default.storage();
            let storageRef2 = storages2.ref();
            let spaceRef2 = storageRef2.child(filePath2);

            spaceRef.getDownloadURL().then(url => {
              fotoCargada1 = url;
              fotoCargada1 = `${fotoCargada1}`;
              usuario.fotoUno = fotoCargada1;

              spaceRef2.getDownloadURL().then((url) => {
                fotoCargada2 = url;
                fotoCargada2 = `${fotoCargada2}`;
                usuario.fotoDos = fotoCargada2;
                this.AgregarUsuario(usuario);
                return true;
              });
            });
          });
        });
      }
      else {

        const filePath = `/fotos/${usuario.id}/1.png`;
        const ref = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, foto1).then(() => {

          let storages = firebase.default.storage();
          let storageRef = storages.ref();
          let spaceRef = storageRef.child(filePath);

          spaceRef.getDownloadURL().then(url => {

            fotoCargada1 = url
            fotoCargada1 = `${fotoCargada1}`
            usuario.fotoUno = fotoCargada1;

            this.AgregarUsuario(usuario);
            return true;
          });
        });
      }
    });

    return retorno;
  }


  public async AgregarUsuario(usuario: any) {
    await this.referenciaAlaColeccionPacientes.doc(usuario.id).set({ ...usuario });
  } 


  EspecialistaHabilitado(user: Usuario) {
    let retorno = false;
    if(user.categoria == "Especialista")
    {
      if(user.habilitado){
        retorno = true;
      }
    } 
    return retorno;
  }

  public HabilitarEspecialista(item : Usuario){
    item.habilitado = true;
    this.referenciaAlaColeccionPacientes.doc(item.id).set({...item}).then(() =>{
      console.log("Habilitado con exito!");
    });

  }

  public TraerUnoPorCorreo(correo :any){
    return this.bd.collection(this.rutaDeLaColeccion, ref => ref.where("mail", "==", correo));
  }
}
