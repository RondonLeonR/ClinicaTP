import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { FireService } from 'src/app/servicios/fire.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { HistoriaClinicaService } from 'src/app/servicios/historia-clinica.service';

@Component({
  selector: 'app-gestionar-turnos',
  templateUrl: './gestionar-turnos.component.html',
  styleUrls: ['./gestionar-turnos.component.css']
})
export class GestionarTurnosComponent implements OnInit {

  //cambiar a false
  mostrarFinalizarTurno = false;

  //Usuario ingresado
  especialista: any;

  //Listado
  listadoEspecialidades: any;
  listadoTurnos: any;

  //banderas
  elegirEspecialidad = true;
  elegirPaciente = false;


  //elecciones
  especialidadSeleccionada: any;

  //Nuevos atributos
  comentario = "";

  //FinalizarTurno
  nuevaHistoriaClinica : HistoriaClinica;
  nuevoDato : string = '';
  nuevoValor : string = '';
  diagnostico = "";
  resenia = "";

  //Auxiliares
  auxTurno : any;

  constructor(
    private fire: FireService,
    private auth: AuthService,
    private fireTurnos: TurnosService,
    private fireHistoria: HistoriaClinicaService
  ) {
    this.nuevaHistoriaClinica = new HistoriaClinica();
  }

  ngOnInit(): void {
    this.fire.TraerUnoPorCorreo(this.auth.currentUser).valueChanges().subscribe((data) => {
      this.especialista = <Usuario>data[0];
      this.listadoEspecialidades = this.especialista.especialidad;
    });

    

    this.CargarTurnos();
  }

  ElegirEspecialidad(nombre) {
    this.especialidadSeleccionada = nombre;

    this.elegirEspecialidad = false;
    this.elegirPaciente = true;

  }

  CargarTurnos() {
    this.fireTurnos.TraerTodosLosTurnos().valueChanges().subscribe((data) => {
      this.listadoTurnos = data;
    });
  }

  SeleccionarOtraEspecialidad(){
    this.elegirEspecialidad = true;
    this.elegirPaciente = false;
  }


  AceptarTurno(item){
    item.estado = "Aceptado";
    this.fireTurnos.ModificarTurno(item.id,item);
    this.CargarTurnos();
  }

  RechazarTurno(){
    this.auxTurno.comentarioEspecialista = this.comentario;
    this.auxTurno.estado = "Rechazado";
    this.fireTurnos.ModificarTurno(this.auxTurno.id,this.auxTurno);
    this.CargarTurnos();
  }

  CancelarTurno(){
    this.auxTurno.comentarioEspecialista = this.comentario;
    this.auxTurno.estado = "Cancelado";
    this.fireTurnos.ModificarTurno(this.auxTurno.id,this.auxTurno);
    this.CargarTurnos();
  }

  //Agregar al finalizar turno NUEVO
  TerminarTurno(){
    this.auxTurno.comentarioEspecialista = this.diagnostico;
    this.auxTurno.estado = "Realizado";

    this.fireTurnos.ModificarTurno(this.auxTurno.id,this.auxTurno);
    this.CargarTurnos();
    //console.log(this.diagnostico);
  }
  
  SetearTurnoModificar(item){
    this.auxTurno = item;
  }

  CargarFinalizarTurno(item){
    this.auxTurno = item;
    this.mostrarFinalizarTurno = true;
  }

  CancelarFinalizarTurno(){
    this.mostrarFinalizarTurno = false;
  }

  AgregarDatoDinamico(){
    if(this.nuevaHistoriaClinica.datosDinamicos.length<3){
      let agregado = false;

      this.nuevaHistoriaClinica.datosDinamicos.forEach( dato =>{
        if(dato.nombre == this.nuevoDato){
          agregado = true;
        }
      });

      if(!agregado){
        let nuevoDatoAgregar: any={};
        nuevoDatoAgregar.nombre = this.nuevoDato;
        nuevoDatoAgregar.valor = this.nuevoValor;
        this.nuevaHistoriaClinica.datosDinamicos.push(nuevoDatoAgregar);
      }
    }
  }

  AceptarFinalizarTurno(){

    this.auxTurno.comentarioEspecialista = this.nuevaHistoriaClinica.diagnostico;
    this.auxTurno.estado = "Realizado";
    this.auxTurno.resenia = this.resenia;
    
    this.fireTurnos.ModificarTurno(this.auxTurno.id,this.auxTurno);
    //console.log(this.auxTurno);
    this.nuevaHistoriaClinica.correoPaciente = this.auxTurno.paciente;
    this.nuevaHistoriaClinica.correoEspecialista = this.auxTurno.especialista;
    this.nuevaHistoriaClinica.especialidad = this.auxTurno.especialidad;
    this.nuevaHistoriaClinica.idTurno = this.auxTurno.id;

    this.fireHistoria.AgregarUno(this.nuevaHistoriaClinica);
    //console.log(this.nuevaHistoriaClinica);
    this.mostrarFinalizarTurno = false;
  } 

}
