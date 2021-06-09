import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  listaTurnos: any;
  auxTurno : any;
  motivoCancelacion  = "";

  //Atencion
  calificacion = "";
  calificacionMala = false;
  calificacionBuena = false;
  calificacionMuyBuena = false;
  comentarioAtencion = "";
  comentarioEncuesta = "";

  constructor(
    private fireTurno: TurnosService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.CargarTurnos();
  }

  CargarTurnos(){
    this.fireTurno.TraerTodosLosTurnos().valueChanges().subscribe((data) => {
      this.listaTurnos = data;
    });
  }

  AgregarCalificacion(selecc) {
    if (selecc == 'mala') {
      this.calificacionMala = true;
      this.calificacionBuena = false;
      this.calificacionMuyBuena = false;

      this.calificacion = "Mala";
    }

    if (selecc == 'buena') {
      this.calificacionMala = false;
      this.calificacionBuena = true;
      this.calificacionMuyBuena = false;

      this.calificacion = "Buena";
    }

    if (selecc == 'muyBuena') {
      this.calificacionMala = false;
      this.calificacionBuena = false;
      this.calificacionMuyBuena = true;

      this.calificacion = "Muy Buena";
    }
  }


  SeterTurno(item){
    this.auxTurno = item;
  } 

  CancelarTurno(){
    this.auxTurno.motivoCancelacion = this.motivoCancelacion;
    this.auxTurno.estado = "Cancelado";
    this.fireTurno.ModificarTurno(this.auxTurno.id, this.auxTurno);
    this.CargarTurnos();
  }

  GuardarAtencion(){
    this.auxTurno.calificacion = this.calificacion;
    this.auxTurno.comentarioAtencion = this.comentarioAtencion;
    this.auxTurno.comentarioEncuesta = this.comentarioEncuesta;
    //console.log(this.auxTurno);
    this.fireTurno.ModificarTurno(this.auxTurno.id, this.auxTurno);
  }

}
