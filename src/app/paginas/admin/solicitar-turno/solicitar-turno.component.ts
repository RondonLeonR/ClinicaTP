import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { FireService } from 'src/app/servicios/fire.service';
import { HorariosService } from 'src/app/servicios/horarios.service';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {


  turnoModificar: any;
  motivoCancelacion = "";

  //Dias de semana
  dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

  ///Guardando turno creado
  turnoCreado : any = {}

  //Activar solicitar turnos o mis turnos
  solicitarTurno = true;
  verMisTurnos = false;

  //banderas
  seleccioneEspecialidad = true;
  seleccioneEspecialista = false;
  seleccioneTurno = false;
  seleccionePaciente = false;

  //probando
  especialidades = [];
  profesionalEspecialidad = [];

  //Listado de especialistas
  listadoEsp = [];
  listadoUsuarios = [];
  profesionalesParaTurno = [];

  //Listados
  usuarios: any;
  listaHorarios: any;
  listaTurnos: any;
  listaHorariosDelEspecialista: any;
  listadoPacientes: any;

  //Selecciones guardadas
  usuarioIngresado: any;
  especialistaSeleccionado: any;
  especialidadSeleccionada: any;

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
  ) { }

  ngOnInit(): void {
    /*this.fire.TraerUnoPorCorreo(this.auth.currentUser).valueChanges().subscribe((data)=>{
      this.usuarioIngresado = data; 
    }); */

    this.usuarios = this.fire.GetUsuarios().valueChanges().subscribe((user) => {
      this.listadoUsuarios = user;
      this.CargarListas();
    }, error => console.log(error));

    this.fireHorario.TraerTodosLosHorarios().valueChanges().subscribe((data) => {
      this.listaHorarios = data;
    });

    this.fire.GetUsuarios().valueChanges().subscribe((data) =>{
      this.listadoPacientes = data;
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
    this.listadoEsp.forEach(prof => {
      prof.especialidad.forEach(esp => {
        if (!this.especialidades.includes(esp.nombre)) {
          this.especialidades.push(esp.nombre);
        }
      });
    });
  }


  //Busco turnos segun la especialidad
  private BuscarTurnosDeEspecialidad() {
    this.listaTurnosPorEspecialidad = this.listaTurnos.filter((value) => {
      return value.especialidad == this.especialidadSeleccionada;
    });
  }

  CambiarVista(algo) {
    if (algo == 'solicitar') {
      this.solicitarTurno = true;
      this.verMisTurnos = false;
    }
    else if (algo == 'misTurnos') {
      this.solicitarTurno = false;
      this.verMisTurnos = true;
    }
  }

  ////ESTADOS DEL PEDIDO DE TURNO

  EspecialidadSeleccionada(item) {
    this.especialistaSeleccionado = null;
    this.profesionalEspecialidad = [];
    this.listadoEsp.forEach(prof => {
      prof.especialidad.forEach(esp => {
        if (esp.nombre == item) {
          this.profesionalEspecialidad.push(prof);
        }
      });
    });

    this.especialidadSeleccionada = item;

    //Cambio la vista del usuario
    this.seleccioneEspecialidad = false;
    this.seleccioneEspecialista = true;

    this.BuscarTurnosDeEspecialidad();
  }

  EspecialistaSeleccionado(item) {
    this.seleccioneEspecialidad = false;
    this.seleccioneEspecialista = false;
    this.seleccioneTurno = true;
    

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

      let horaHasta = parseInt(this.listaHorariosDelEspecialista.hasta.slice(0, 2));
      let horaDesde = parseInt(this.listaHorariosDelEspecialista.desde.slice(0, 2));
      let rangoHoras = horaHasta - horaDesde;

      let fecha = new Date();

      for (let dia = 0; dia < 15; dia++) {
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
            turno.dia = this.dias[fecha.getDay()] + ' ' + fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear();

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

  //Busco turnos segun especialista/profesional
  public BuscarTurnosDeEspecialista() {
    this.listaTurnosPorEspecialistaSeleccionado = this.listaTurnosPorEspecialidad.filter((value) => {
      return value.especialista == this.especialistaSeleccionado.mail;
    });

  }

  SeleccionTurno(turno) {
    //console.log(turno);
    this.seleccioneEspecialista = false;
    this.seleccioneTurno = false;
    this.seleccionePaciente = true;

    let nuevoTurno : any = {};
  
    nuevoTurno.especialidad = this.especialidadSeleccionada;
    nuevoTurno.especialista = this.especialistaSeleccionado.mail;
    nuevoTurno.estado = "Pendiente";
    nuevoTurno.fecha = turno.dia;
    nuevoTurno.hora = turno.hora;

    
    
    nuevoTurno.resenia = "vacio";
    nuevoTurno.comentarioEspecialista = "vacio";

    this.turnoCreado = nuevoTurno;

  }

  PedirTurno(item){

    this.turnoCreado.nombrePaciente = item.nombre;
    this.turnoCreado.apellidoPaciente = item.apellido;
    this.turnoCreado.edadPaciente = item.edad;
    this.turnoCreado.obraSocialPaciente = item.obraSocial;
    this.turnoCreado.fotoPaciente = item.fotoUno;
    this.turnoCreado.paciente = item.mail;

    this.fireTurno.AgregarTurno(this.turnoCreado);

    //Cargar turnos para la lista
    this.CargarTurnos();

    //cambio la vista
    this.solicitarTurno = false;
    this.verMisTurnos = true;

    this.seleccioneEspecialidad = true;
    this.seleccioneEspecialista = false;
    this.seleccioneTurno = false;
    this.seleccionePaciente = false;
  }

  SeterTurno(item){
    this.turnoModificar = item;
  }


  CancelarTurnoConMotivo(){
    this.turnoModificar.motivoCancelacion = this.motivoCancelacion;
    this.turnoModificar.estado = "Cancelado";
    this.fireTurno.ModificarTurno(this.turnoModificar.id,this.turnoModificar);
    this.CargarTurnos();
  }

  

  CancelarTurno() {
    this.seleccioneEspecialidad = true;
    this.seleccioneEspecialista = false;
    this.seleccioneTurno = false;
    this.seleccionePaciente = false;
  }
}
