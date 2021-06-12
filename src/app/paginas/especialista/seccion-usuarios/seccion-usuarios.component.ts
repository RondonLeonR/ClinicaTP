import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { FireService } from 'src/app/servicios/fire.service';
import { HistoriaClinicaService } from 'src/app/servicios/historia-clinica.service';


@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.css']
})
export class SeccionUsuariosComponent implements OnInit {

  //Usuario ingresado
  especialista: any;
  especialidadSeleccionada : any;

  //Listado
  listadoEspecialidades: any;
  listadoTurnos: any;

  //banderas
  mostrarEspecialidades = true;
  mostrarHistoriales = false;


  historialesEncontrados: any []=[];

  auxHistorial: any;

  constructor(
    private fire: FireService,
    private auth: AuthService,
    private fireHistorial: HistoriaClinicaService) { }

  ngOnInit(): void {
    this.fire.TraerUnoPorCorreo(this.auth.currentUser).valueChanges().subscribe((data) => {
      this.especialista = <Usuario>data[0];
      this.listadoEspecialidades = this.especialista.especialidad;
    });

    this.fireHistorial.BuscarHistoriaCorreoEsp(this.auth.currentUser).valueChanges().subscribe((data)=>{
      this.historialesEncontrados = data;
      console.log(this.historialesEncontrados);
    });
  }

  ElegirEspecialidad(nombre:any){
    console.log(nombre);
    this.especialidadSeleccionada = nombre;

    this.mostrarEspecialidades = false;
    this.mostrarHistoriales = true;
  }

  SeleccionarOtraEspecialidad(){
    this.mostrarEspecialidades = true;
    this.mostrarHistoriales = false;
  }


  SetearHistorial(historial){
    this.auxHistorial = historial;
  }
}
