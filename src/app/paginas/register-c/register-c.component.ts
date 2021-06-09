import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Usuario } from '../../clases/usuario';

//Servicios

import { FireService } from '../../servicios/fire.service';

@Component({
  selector: 'app-register-c',
  templateUrl: './register-c.component.html',
  styleUrls: ['./register-c.component.css']
})
export class RegisterCComponent implements OnInit {
  public forma: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;

  public usuario: Usuario;


  public auxFotoUno: any;
  public auxFotoDos: any;
  

  spinner = true;

  siteKey : string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fire: FireService,

  ) {
    this.usuario = new Usuario();
    this.siteKey = '6LfFbfMaAAAAABgjELf6hrQufQR_FeONu-ujh7wB';
  }

  ngOnInit(): void {
    this.forma = this.fb.group({
      'nombre': ['', [Validators.required]],
      'apellido': ['', [Validators.required]],
      'edad': ['', [Validators.required]],
      'dni': ['', [Validators.required]],
      'obraSocial': ['', [Validators.required]],
      'correo': ['', [Validators.required, Validators.pattern(this.isEmail)]],
      'clave': ['', [Validators.required]],
      'recaptcha': ['', Validators.required]
    })

    setTimeout(() => {
      this.spinner = false;
    }, 3000);
  }

  agregarFoto(foto) {
    this.auxFotoUno = foto.target.files[0];
  }

  agregarFotoDos(foto) {
    this.auxFotoDos = foto.target.files[0];
  }


  async crearPaciente() {
    this.usuario.categoria = "Paciente";
    this.usuario.habilitado = true;
    this.usuario.nombre = this.forma.value.nombre;
    this.usuario.apellido = this.forma.value.apellido;
    this.usuario.edad = this.forma.value.edad;
    this.usuario.dni = this.forma.value.dni;
    this.usuario.obraSocial = this.forma.value.obraSocial;
    this.usuario.mail = this.forma.value.correo;
    this.usuario.pass = this.forma.value.clave;
    
    this.fire.AgregarUno(this.usuario,this.auxFotoUno,this.auxFotoDos);

    this.spinner = true;
    if(!this.fire.AgregarUno(this.usuario, this.auxFotoUno)){
      this.spinner = false;
      this.router.navigateByUrl('login');
    }
  }

}
