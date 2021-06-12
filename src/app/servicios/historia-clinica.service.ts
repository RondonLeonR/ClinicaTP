import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore/';
import { Injectable } from '@angular/core';
import { HistoriaClinica } from '../clases/historia-clinica';


@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  //historia clinica
  rutaDeLaColeccion = "/historiaClinica";
  referenciaAlaColeccion: AngularFirestoreCollection<HistoriaClinica>;

  constructor(private bd: AngularFirestore) {
    this.referenciaAlaColeccion = bd.collection(this.rutaDeLaColeccion);
  }

  public AgregarUno(nuevaHistoria: HistoriaClinica){
    nuevaHistoria.id = this.bd.createId();
    this.referenciaAlaColeccion.doc(nuevaHistoria.id).set({...nuevaHistoria});
  }

  public  TraerTodos()
  {
    return this.referenciaAlaColeccion;    
  }

  public ModificarUno(unHistoriaClinica)
  {
    this.referenciaAlaColeccion.doc(unHistoriaClinica.id).set({...unHistoriaClinica});
  }

  public BuscarHistoriaCorreo(correo){
    return this.bd.collection(this.rutaDeLaColeccion, ref=>ref.where("correoPaciente","==",correo));
  }

  public BuscarHistoriaCorreoEsp(correo){
    return this.bd.collection(this.rutaDeLaColeccion, ref=>ref.where("correoEspecialista","==",correo));
  }
}
