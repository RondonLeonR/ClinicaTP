import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { FireService } from 'src/app/servicios/fire.service';
import { HorariosService } from 'src/app/servicios/horarios.service';

@Component({
  selector: 'app-gestionar-horarios',
  templateUrl: './gestionar-horarios.component.html',
  styleUrls: ['./gestionar-horarios.component.css']
})
export class GestionarHorariosComponent implements OnInit {

  //Listado de Especialistas y Especialista ingresado
  listadoEspecialidades = [];
  especialista: any;

  spinner = true;
 

  //En caso de encontrar los horarios
  horariosEncontrados = false;
  listaHorariosDelEspecialista:any[]=[];
  //Si se encuentran horarios de esa especialidad se cargan aca
  horarioDeEspecialidadSeleccionada: any = false;


  //Selecciones
  especilidadSeleccionada: any = "";


  //Horas elegidas
  desde: any;
  hasta: any;
  desdeSabado: any;
  hastaSabado: any;

  //Horas dias de semana o sabado
  sabadoCargado = false;

  //Dias elegidas por el especialista
  dias = {
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false
  };


  //Duracion de una hora de atencion al cliente
  duracion = 60;

  constructor(
    private fire: FireService,
    private auth: AuthService,
    private fireHorario: HorariosService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.auth.currentUser == null) {
      this.router.navigateByUrl('/login');
    }
    this.fire.TraerUnoPorCorreo(this.auth.currentUser).valueChanges().subscribe((data)=>{
      this.especialista = <Usuario>data[0];
      this.listadoEspecialidades = this.especialista.especialidad;
      this.CargarHorarios();
    }); 
    setTimeout(() => {
      this.spinner = false;
    }, 2000);
  }

  CargarHorarios(){
    //console.log(this.especialista);
    this.fireHorario.TraerHorariosEspecialista(this.especialista.mail).valueChanges().subscribe((data)=>{
      this.listaHorariosDelEspecialista = data;
    });
  }
  
  SeleccionarHorario(numeroSelecc){
    if(numeroSelecc == 1){
      this.desde = '08:00';
      this.hasta = '12:00';
    }
    else if(numeroSelecc == 2){
      this.desde = '12:00';
      this.hasta = '16:00';
    }
    else if(numeroSelecc == 3){
      this.desde = '16:00';
      this.hasta = '19:00';
    }
    else if(numeroSelecc == 4){
      this.desdeSabado = '08:00';
      this.hastaSabado = '11:00';
    }
    else if(numeroSelecc == 5){
      this.desdeSabado = '11:00';
      this.hastaSabado = '14:00';
    }
  }

  CargarSabado() {
    if (this.sabadoCargado == false) {
      this.sabadoCargado = true;
    }
    else {
      this.sabadoCargado = false;
    }
  }


  SeleccionaEspecialidad(nombre){
    this.horariosEncontrados = false;
    this.especilidadSeleccionada = nombre;
    this.horarioDeEspecialidadSeleccionada = false;

    this.listaHorariosDelEspecialista.forEach((item)=>{
      if(item.especialidad == nombre){
        this.horarioDeEspecialidadSeleccionada = item;
        this.horariosEncontrados = true;
      }
    });
  }

  AgregarHorario(){
    let horario : any = {};

    horario.desde = this.desde;
    horario.hasta = this.hasta;
    horario.especialidad = this.especilidadSeleccionada;
    horario.correo = this.especialista.mail;

    horario.dias = this.dias;
    
    if(this.sabadoCargado){
      horario.desdeSabado = this.desdeSabado;
      horario.hastaSabado = this.hastaSabado;
    }

    console.log(horario);

    if(!this.horarioDeEspecialidadSeleccionada){
      this.fireHorario.AgregarHorarios(horario);
    }
    else{
      this.fireHorario.ModificarHorario(this.horarioDeEspecialidadSeleccionada.id,horario);
    }

    
    
    //probando si se puede cargar los horarios ya habiendo cargado los nuevos.
    this.CargarHorarios();
  }

}
