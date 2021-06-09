import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

   //Turnos
   rutaDeLaColeccion = "/turnos";
   referenciaAlaColeccionTurno: AngularFirestoreCollection<any>;

  constructor(private bd:AngularFirestore) {
    this.referenciaAlaColeccionTurno = this.bd.collection(this.rutaDeLaColeccion);
  }

  AgregarTurno(turno){
    turno.id = this.bd.createId();
    this.referenciaAlaColeccionTurno.doc(turno.id).set({...turno});
  }

  TraerTodosLosTurnos(){
    return this.referenciaAlaColeccionTurno;
  }


  ///Falta probar
  ModificarTurno(id,turno){
    turno.id = id;
    this.referenciaAlaColeccionTurno.doc(id).set({...turno});
  }
}
