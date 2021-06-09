import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { FireService } from 'src/app/servicios/fire.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  public forma: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;

  public usuario: Usuario;

  public auxFotoUno: any;

  //Captcha
  siteKey : string;

  spinner = true;

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
      'correo': ['', [Validators.required, Validators.pattern(this.isEmail)]],
      'clave': ['', [Validators.required]],
      'recaptcha': ['', Validators.required]
    })

    setTimeout(() => {
      this.spinner = false;
    }, 1000);
  }

  agregarFoto(foto) {
    this.auxFotoUno = foto.target.files[0];
  }

  async crearAdmin(){
    this.usuario.categoria = "Admin";
    this.usuario.habilitado = true;///Estara asi hasta que el admin lo admita
    this.usuario.nombre = this.forma.value.nombre;
    this.usuario.apellido = this.forma.value.apellido;
    this.usuario.edad = this.forma.value.edad;
    this.usuario.dni = this.forma.value.dni;
    this.usuario.mail = this.forma.value.correo;
    this.usuario.pass = this.forma.value.clave;

    this.spinner = true;
    if(!this.fire.AgregarUno(this.usuario, this.auxFotoUno)){
      this.spinner = false;
      this.router.navigateByUrl('home');
    }
  }
}
