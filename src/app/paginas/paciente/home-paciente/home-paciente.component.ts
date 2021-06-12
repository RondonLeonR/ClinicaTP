import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { FireService } from 'src/app/servicios/fire.service';
import { HorariosService } from 'src/app/servicios/horarios.service';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-home-paciente',
  templateUrl: './home-paciente.component.html',
  styleUrls: ['./home-paciente.component.css']
})
export class HomePacienteComponent implements OnInit {

  //Probando
  turnoRapido: any;
  correoEncontrado : any  = "";

  itemPipe: any = "";

  

  auxTurno: any;
  comentarioAtencion = "";

  //Activar solicitar turnos o mis turnos
  solicitarTurno = true;
  verMisTurnos = false;


  //Dias de semana
  dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

  //Listados
  usuarios: any;
  listaHorarios: any;
  listaTurnos: any;
  listaHorariosDelEspecialista: any;


  //Selecciones guardadas
  usuarioIngresado: any;
  especialistaSeleccionado: any;
  especialidadSeleccionada: any;

  //Listado de especialistas
  listadoEsp = [];
  listadoUsuarios = [];
  profesionalesParaTurno = [];

  //probando
  especialidades = [];
  profesionalEspecialidad = [];

  //Turnos para mostrar
  diasMostrar: any[] = [];
  turnosMostrar: any[] = [];
  listaTurnosPorEspecialistaSeleccionado: any[] = [];
  listaTurnosPorEspecialidad: any[] = [];

  constructor(
    private fire: FireService,
    private fireHorario: HorariosService,
    private fireTurno: TurnosService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fire.TraerUnoPorCorreo(this.auth.currentUser).valueChanges().subscribe((data) => {
      this.usuarioIngresado = data;
    });
    this.usuarios = this.fire.GetUsuarios().valueChanges().subscribe((user) => {
      this.listadoUsuarios = user;
      this.CargarListas();
    }, error => console.log(error));

    this.fireHorario.TraerTodosLosHorarios().valueChanges().subscribe((data) => {
      this.listaHorarios = data;
    });

    this.CargarTurnos();


    setTimeout(() => {
      this.ListarEspecialidades();
    }, 2000);
  }


  CargarTurnos() {
    this.fireTurno.TraerTodosLosTurnos().valueChanges().subscribe((data) => {
      this.listaTurnos = data;
    });
  }


  CargarListas() {
    this.listadoEsp = this.listadoUsuarios.filter(p => p.categoria == "Especialista" && p.habilitado == true);

  }

  ListarEspecialidades() {
    /*this.listadoEsp.forEach(prof => {
      prof.especialidad.forEach(esp => {
        if (!this.especialidades.includes(esp.nombre)) {
          this.especialidades.push(esp.nombre);
        }
      });
    });*/

    this.fire.GetEspecialidades().valueChanges().subscribe((data) => {
      //console.log(data);
      this.especialidades = data;
    });


  }

  EspecialidadSeleccionada(item) {
    this.especialistaSeleccionado = null;
    this.profesionalEspecialidad = [];
    this.listadoEsp.forEach(prof => {
      prof.especialidad.forEach(esp => {
        if (esp.nombre == item.nombre) {
          this.profesionalEspecialidad.push(prof);
        }
      });
    });

    this.especialidadSeleccionada = item.nombre;


    this.BuscarTurnosDeEspecialidad();
    this.CargarTurnoRapido();
  }

  //Setear horarios
  EspecialistaSeleccionado(item) {
    

    this.especialistaSeleccionado = item;
    this.listaHorariosDelEspecialista = false;

    this.turnosMostrar = [];
    this.diasMostrar = [];
    this.BuscarTurnosDeEspecialista();

    for (let i = 0; i < this.listaHorarios.length; i++) {
      if (this.listaHorarios[i].correo == this.especialistaSeleccionado.mail &&
        this.listaHorarios[i].especialidad == this.especialidadSeleccionada) {
        //console.log("Horarios encontrados");
        this.listaHorariosDelEspecialista = this.listaHorarios[i];
      }
    }

    //console.log(this.listaHorariosDelEspecialista);
    if (this.listaHorariosDelEspecialista != false) {
      if (this.listaHorariosDelEspecialista.dias.lunes) {
        this.diasMostrar.push("Lunes");
      }
      if (this.listaHorariosDelEspecialista.dias.martes) {
        this.diasMostrar.push("Martes");
      }
      if (this.listaHorariosDelEspecialista.dias.miercoles) {
        this.diasMostrar.push("Miercoles");
      }
      if (this.listaHorariosDelEspecialista.dias.jueves) {
        this.diasMostrar.push("Jueves");
      }
      if (this.listaHorariosDelEspecialista.dias.viernes) {
        this.diasMostrar.push("Viernes");
      }
      if (this.listaHorariosDelEspecialista.dias.sabado) {
        this.diasMostrar.push("Sabado");
      }

      //console.log(this.diasMostrar);

      let horaHasta = parseInt(this.listaHorariosDelEspecialista.hasta.slice(0, 2));
      let horaDesde = parseInt(this.listaHorariosDelEspecialista.desde.slice(0, 2));
      let rangoHoras = horaHasta - horaDesde;

      let fecha = new Date();

      for (let dia = 1; dia < 15; dia++) {
        fecha.setTime(Date.now());
        let diaValido = false;
        fecha.setDate(fecha.getDate() + dia);

        this.diasMostrar.forEach(element => {

          if (element == this.dias[fecha.getDay()]) {
            diaValido = true;
          }
        });


        if (diaValido) {
          for (let i = 0; i < rangoHoras; i++) {
            let turno: any = {};
            let month = fecha.getMonth() + 1;
            turno.dia = this.dias[fecha.getDay()] + ' ' + fecha.getDate() + '/' + month + '/' + fecha.getFullYear();

            turno.nombreDia = this.dias[fecha.getDay()];


            if (this.dias[fecha.getDay()] == 'Sabado') {
              turno.hora = parseInt(this.listaHorariosDelEspecialista.desdeSabado.slice(0, 2)) + i + ':00';
            }
            else {
              turno.hora = (horaDesde + i) + ':00';
            }
            let encontrado = false;

            this.listaTurnosPorEspecialistaSeleccionado.forEach((value) => {

              if (value.fecha == turno.dia && value.hora == turno.hora) {
                encontrado = true;
              }
            });

            if (!encontrado) {

              this.turnosMostrar.push(turno);
            }
          }

        }
      }
    }

  }

  CargarTurnoRapido() {
    let flagEncontrado = false;
    let auxLista: any = false;
    let diasRapido: any[] = [];
    let fecha = new Date();
    
    let horaHasta = 8;
    let horaDesde = 19;
    let horaHastaSabado = 8;
    let horaDesdeSabado = 14;
    
    let turno: any = {};
    

    for (let i = 0; i < this.listaHorarios.length; i++) {
      if (this.listaHorarios[i].especialidad == this.especialidadSeleccionada) {
        auxLista = this.listaHorarios[i];
        
        //Obtengo rango de horas
        if(horaHasta < parseInt(auxLista.hasta.slice(0, 2))){
          horaHasta = parseInt(auxLista.hasta.slice(0, 2));
        }
        if(horaDesde > parseInt(auxLista.desde.slice(0, 2))){
          horaDesde = parseInt(auxLista.desde.slice(0, 2));
        }
        
        if (auxLista.dias.lunes && !diasRapido.includes("Lunes")) {
          diasRapido.push("Lunes");
        }
        if (auxLista.dias.martes && !diasRapido.includes("Martes")) {
          diasRapido.push("Martes");
        }
        if (auxLista.dias.miercoles && !diasRapido.includes("Miercoles")) {
          diasRapido.push("Miercoles");
        }
        if (auxLista.dias.jueves && !diasRapido.includes("Jueves")) {
          diasRapido.push("Jueves");
        }
        if (auxLista.dias.viernes && !diasRapido.includes("Viernes")) {
          diasRapido.push("Viernes");
        }
        if (auxLista.dias.sabado && !diasRapido.includes("Sabado")) {
          diasRapido.push("Sabado");
          if(horaHastaSabado < parseInt(auxLista.hastaSabado.slice(0, 2))){
            horaHastaSabado = parseInt(auxLista.hastaSabado.slice(0, 2));
          }
          if(horaDesdeSabado > parseInt(auxLista.desdeSabado.slice(0, 2))){
            horaDesdeSabado = parseInt(auxLista.desdeSabado.slice(0, 2));
          }
        }
      }
    }

    let rangoHoras = horaHasta - horaDesde;


    for (let dia = 1; dia < 15 ; dia++) {
      fecha.setTime(Date.now());
      let diaValido = false;
      fecha.setDate(fecha.getDate() + dia);

      diasRapido.forEach(element => {
        if(element == this.dias[fecha.getDay()]){
          diaValido = true;
        }
      });

      if (diaValido) {
        for (let i = 0; i < rangoHoras; i++) {
          
          let month = fecha.getMonth() + 1;
          turno.dia = this.dias[fecha.getDay()] + ' ' + fecha.getDate() + '/' + month + '/' + fecha.getFullYear();

          turno.nombreDia = this.dias[fecha.getDay()];

          if (this.dias[fecha.getDay()] == 'Sabado') {
            turno.hora = horaDesdeSabado + i + ':00';
          }
          else {
            turno.hora = (horaDesde + i) + ':00';
          }
          let encontrado = false;

          this.listaTurnos.forEach((value) => {

            if (value.fecha == turno.dia && value.hora == turno.hora) {
              encontrado = true;
            }
          });
          if (!encontrado) {
            this.turnoRapido = turno;
            flagEncontrado = true;
            break;
          }
        }
      }

      if(flagEncontrado){
        break;
      }
    }
  }


  //Busco turnos segun la especialidad
  private BuscarTurnosDeEspecialidad() {
    this.listaTurnosPorEspecialidad = this.listaTurnos.filter((value) => {
      return value.especialidad == this.especialidadSeleccionada;
    });
  }

  //Busco turnos segun especialista/profesional
  public BuscarTurnosDeEspecialista() {
    this.listaTurnosPorEspecialistaSeleccionado = this.listaTurnosPorEspecialidad.filter((value) => {
      return value.especialista == this.especialistaSeleccionado.mail;
    });

  }

  PedirTurno(turno) {
    //console.log(this.usuarioIngresado);
    let nuevoTurno: any = {};
    nuevoTurno.nombrePaciente = this.usuarioIngresado[0].nombre;
    nuevoTurno.apellidoPaciente = this.usuarioIngresado[0].apellido;
    nuevoTurno.edadPaciente = this.usuarioIngresado[0].edad;
    nuevoTurno.obraSocialPaciente = this.usuarioIngresado[0].obraSocial;
    nuevoTurno.fotoPaciente = this.usuarioIngresado[0].fotoUno;


    nuevoTurno.especialidad = this.especialidadSeleccionada;
    nuevoTurno.especialista = this.especialistaSeleccionado.mail;
    nuevoTurno.estado = "Pendiente";
    nuevoTurno.fecha = turno.dia;
    nuevoTurno.hora = turno.hora;
    nuevoTurno.paciente = this.auth.currentUser;
    nuevoTurno.resenia = "vacio";
    nuevoTurno.comentarioEspecialista = "vacio";

    ///console.log(nuevoTurno);
    this.fireTurno.AgregarTurno(nuevoTurno);

    //Cargar turnos para la lista
    this.CargarTurnos();


    setTimeout(() => {
      this.router.navigateByUrl("paciente/misTurnos");
    }, 2000);
  }


  SeterTurno(item) {
    this.auxTurno = item;
  }


  

  async PedirTurnoRapido(item){
    //console.log(item);
    this.correoEncontrado = "";
    for (let i = 0; i < this.listaHorarios.length; i++) {
      if (this.listaHorarios[i].especialidad == this.especialidadSeleccionada) {
        await this.BuscarTurnoHorario(this.listaHorarios[i], item);
      }
      if(this.correoEncontrado != ""){
        break;
      }
    }

    let nuevoTurno: any = {};
    nuevoTurno.nombrePaciente = this.usuarioIngresado[0].nombre;
    nuevoTurno.apellidoPaciente = this.usuarioIngresado[0].apellido;
    nuevoTurno.edadPaciente = this.usuarioIngresado[0].edad;
    nuevoTurno.obraSocialPaciente = this.usuarioIngresado[0].obraSocial;
    nuevoTurno.fotoPaciente = this.usuarioIngresado[0].fotoUno;

    /////FALTA QUE CARGE EL ESPECIALISTA Y NADA MAS
    

    nuevoTurno.especialidad = this.especialidadSeleccionada;
    nuevoTurno.especialista = this.correoEncontrado;
    nuevoTurno.estado = "Pendiente";
    nuevoTurno.fecha = item.dia;
    nuevoTurno.hora = item.hora;
    nuevoTurno.paciente = this.auth.currentUser;
    nuevoTurno.resenia = "vacio";
    nuevoTurno.comentarioEspecialista = "vacio";

    ///console.log(nuevoTurno);
    this.fireTurno.AgregarTurno(nuevoTurno);
    //console.log(nuevoTurno);

    //Cargar turnos para la lista
    this.CargarTurnos();


    setTimeout(() => {
      this.router.navigateByUrl("paciente/misTurnos");
    }, 2000);
  }

  BuscarTurnoHorario(horario : any, turno: any){
    let desde =  parseInt(horario.desde.slice(0, 2));
    let hasta =  parseInt(horario.hasta.slice(0, 2));

    let horaSeleccionada =  parseInt(turno.hora.slice(0, 2));

    let diasRapido: any[] = [];

    if (horario.dias.lunes) {
      diasRapido.push("Lunes");
    }
    if (horario.dias.martes) {
      diasRapido.push("Martes");
    }
    if (horario.dias.miercoles) {
      diasRapido.push("Miercoles");
    }
    if (horario.dias.jueves) {
      diasRapido.push("Jueves");
    }
    if (horario.dias.viernes) {
      diasRapido.push("Viernes");
    }
    if (horario.dias.sabado) {
      diasRapido.push("Sabado");
    }
    if(this.especialidadSeleccionada == horario.especialidad){
      for(let i = desde; i < hasta; i++){
        console.log(desde + " " + hasta);
        console.log(horaSeleccionada);
        console.log(horario.correo);
        if(i == horaSeleccionada && diasRapido.includes(turno.nombreDia)){
          this.correoEncontrado = horario.correo;
          break;
        }
      }
    }
    
  }
}
