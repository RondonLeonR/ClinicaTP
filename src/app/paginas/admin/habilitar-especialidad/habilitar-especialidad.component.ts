import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Especialidades } from 'src/app/clases/especialidades';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { FireService } from 'src/app/servicios/fire.service';
import { HistoriaClinicaService } from 'src/app/servicios/historia-clinica.service';

//import ExcelJS from 'exceljs/index';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';


@Component({
  selector: 'app-habilitar-especialidad',
  templateUrl: './habilitar-especialidad.component.html',
  styleUrls: ['./habilitar-especialidad.component.css']
})
export class HabilitarEspecialidadComponent implements OnInit {

  public listaEspecialistas = [];
  public listaPacientes = [];
  public listaAdministradores = [];
  public listaUsuarios = [];
  public spinner = true;

  public espSeleccionado: any;


  //Activar listados
  listarEsp = true;
  listarPac = false;
  listarAdm = false;

  //Historiales encontrados para el paciente seleccionado
  historialesEncontrados: any;
  historialFiltrado: any[] = [];

  constructor(
    private fire: FireService,
    private auth: AuthService,
    private router: Router,
    private fireHistorial: HistoriaClinicaService
  ) {
    this.espSeleccionado = new Usuario();
  }

  ngOnInit(): void {

    /*
    if (!this.auth.isLogged) {
      this.router.navigateByUrl('/bienvenido');
    }*/

    this.fireHistorial.TraerTodos().valueChanges().subscribe((data) => {
      this.historialesEncontrados = data;
      //console.log(this.historialesEncontrados);
    });

    this.fire.GetUsuarios().valueChanges().subscribe((users) => {
      this.listaUsuarios = users;
      //console.log(this.listaUsuarios);
    });

    this.fire.GetUsuarios().valueChanges().subscribe((user) => {

      this.listaEspecialistas = user.filter((value) => {
        return value.categoria == 'Especialista';
      });

      this.listaPacientes = user.filter((value) => {
        return value.categoria == 'Paciente';
      });

      this.listaAdministradores = user.filter((value) => {
        return value.categoria == 'Admin';
      });

      setTimeout(() => {
        this.spinner = false;
      }, 1500);
    });


  }


  AsignarEspecialista(item: any) {
    this.espSeleccionado = item;

  }

  HabilitarCuenta(item) {

    let auxEspecialidad = new Especialidades();
    this.fire.HabilitarEspecialista(item);
    item.especialidad.forEach(element => {

      if (!element.agregada) {
        auxEspecialidad.nombre = element.nombre;
        auxEspecialidad.foto = "https://firebasestorage.googleapis.com/v0/b/tpfinal-f585b.appspot.com/o/especialidades%2FdoctorDefault.png?alt=media&token=761a79b8-00ea-4734-b0f5-dbf1785efc7e";
        auxEspecialidad.agregada = true;
        this.fire.GuardarEspecialidad(auxEspecialidad);
      }
    });
  }


  Listar(item) {
    if (item == 'adm') {
      console.log("Mostrar administradores");
      this.listarAdm = true;
      this.listarEsp = false;
      this.listarPac = false;
    }
    else if (item == 'esp') {
      console.log("Mostrar Especialistas");
      this.listarAdm = false;
      this.listarEsp = true;
      this.listarPac = false;
    }
    else if (item == 'pac') {
      console.log("Mostrar pacientes");
      this.listarAdm = false;
      this.listarEsp = false;
      this.listarPac = true;
    }
  }

  BuscarEspecialista(item) {
    this.historialFiltrado = [];
    this.historialesEncontrados.forEach(element => {
      if (element.correoPaciente == item.mail) {
        this.historialFiltrado.push(element);
        //console.log(element);
      }
    });
  }


  GenerarExcel() {
    //Creo el libro de excel
    let workbook = new Workbook();

    //Creo la hoja de excel
    let worksheet = workbook.addWorksheet("Listado de Usuarios");

    //Agrego los titulos de la hoja
    let header = ["Nombre", "Apellido", "Edad", "DNI", "Correo", "Perfil"];
    let headerRow = worksheet.addRow(header);

    for (let item of this.listaUsuarios) {
      let aux = [item.nombre ,  item.apellido , item.edad , item.dni , item.mail , item.categoria ];

      worksheet.addRow(aux);
    }

    let fname = "Listado de Usuarios";

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '.xlsx');
    });
  }
}
