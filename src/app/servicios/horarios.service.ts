import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  //Horarios
  rutaDeLaColeccion = "/horarios";
  referenciaAlaColeccionHorarios: AngularFirestoreCollection<any>;

  constructor(private bd: AngularFirestore) {
    this.referenciaAlaColeccionHorarios = bd.collection(this.rutaDeLaColeccion);
  }


  AgregarHorarios(horario){
    horario.id = this.bd.createId()
    this.referenciaAlaColeccionHorarios.doc(horario.id).set({...horario});
  }

  TraerHorariosEspecialista(correo){
    return this.bd.collection(this.rutaDeLaColeccion, ref => ref.where("correo","==",correo));
  }

  TraerTodosLosHorarios(){
    return this.referenciaAlaColeccionHorarios;
  }

  ModificarHorario(id,horario){
    horario.id = id;
    this.referenciaAlaColeccionHorarios.doc(id).set({...horario});
  }
}
