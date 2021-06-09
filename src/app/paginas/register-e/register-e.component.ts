import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../clases/usuario';

import { Especialidades } from '../../clases/especialidades';
//Alert
import Swal, { SweetAlertIcon } from 'sweetalert2';


//Servicios
import { AuthService } from '../../servicios/auth.service';
import { FireService } from '../../servicios/fire.service';

@Component({
  selector: 'app-register-e',
  templateUrl: './register-e.component.html',
  styleUrls: ['./register-e.component.css']
})
export class RegisterEComponent implements OnInit {

  public forma: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;
  public usuario: Usuario;

  public auxFotoUno: any;


  public especialidadesTraidas = this.fire.GetEspecialidades().valueChanges();
  public esp: Especialidades;

  ///Especialiadades Agregadas al usuario 
  public especialidadesAgregadas = [];

  //Captcha
  siteKey : string;


  ///SPINER
  spinner = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private fire: FireService
  ) {
    this.usuario = new Usuario();
    this.esp = new Especialidades();
    this.siteKey = '6LfFbfMaAAAAABgjELf6hrQufQR_FeONu-ujh7wB';
  }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'nombre': ['', [Validators.required]],
      'apellido': ['', [Validators.required]],
      'edad': ['', [Validators.required]],
      'especialidad': ['', [Validators.required]],
      'dni': ['', [Validators.required]],
      'correo': ['', [Validators.required, Validators.pattern(this.isEmail)]],
      'clave': ['', [Validators.required]],
      'foto': ['', [Validators.required]],
      'recaptcha': ['', Validators.required]
    })

    setTimeout(() => {
      this.spinner = false;
    }, 2000);
  }

  agregarFoto(foto) {
    this.auxFotoUno = foto.target.files[0];
  }

  agregarPathFoto(){
    this.usuario.fotoUno = this.fire.referenciaFoto;
  }

  async crearEspecialista() {
    this.usuario.categoria = "Especialista";
    this.usuario.habilitado = false;///Estara asi hasta que el admin lo admita
    this.usuario.nombre = this.forma.value.nombre;
    this.usuario.apellido = this.forma.value.apellido;
    this.usuario.edad = this.forma.value.edad;
    this.usuario.dni = this.forma.value.dni;
    this.usuario.mail = this.forma.value.correo;
    this.usuario.pass = this.forma.value.clave;
    this.usuario.especialidad = this.especialidadesAgregadas;

    console.log(this.usuario);
    this.spinner = true;
    if(!this.fire.AgregarUno(this.usuario, this.auxFotoUno)){
      this.spinner = false;
      this.router.navigateByUrl('login');
    }

  }


  agregarEspecialidad(item: any) {

    if (this.revisarListaEspecialista(item.nombre)) {
      this.especialidadesAgregadas.push(item);
      this.alert('success','Especialidad agregada!');
    }
    else {
      this.alert('error','Especialidad ya agregada!');
    }

  }

  eliminarEspecialidad(item: any) {
    this.especialidadesAgregadas.splice(this.especialidadesAgregadas.indexOf(item),1);
  }

  ///NO SE USA AHORA
  GuardarEspecialidadesBD() {
    this.usuario.especialidad.push(this.esp.nombre);
    for (let item of this.usuario.especialidad) {
      console.log(item);
    }
  }

  AgregarEspecialidadManualmente() {
    let auxEspecialista = new Especialidades();
    auxEspecialista.nombre = this.forma.value.especialidad;
    this.especialidadesAgregadas.push({"agregada":false,"nombre":auxEspecialista.nombre});
    console.log(this.especialidadesAgregadas);
    this.alert('success','Especialidad agregada!');
  }

  //Revisa en la lista de especialidades si esta agregada la que se quiere agregar
  revisarListaEspecialista(nombre: any): boolean {
    let retorno = true;

    this.especialidadesAgregadas.forEach(element => {
      if (element.nombre == nombre) {
        retorno = false;
      }
    });

    return retorno;
  }

  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 500,
      timerProgressBar: true,

      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: text
    })
  }
}
