import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { FireService } from 'src/app/servicios/fire.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tokenhome : any;

  public listaUsuarios = this.fire.GetUsuarios().valueChanges();
  public usuarioIngresado: Usuario;
  public spinner = true; 

  constructor(
    private router: Router,
    private auth: AuthService,
    private fire: FireService
  ) {
    this.usuarioIngresado = new Usuario();
  }

  ngOnInit(): void {
    this.tokenhome = localStorage.getItem('token');
    //console.log(this.tokenhome);
    
    setTimeout(() => {
      this.spinner = false;
    }, 1000);

    if(this.auth.currentUser == null){
      this.CerrarSesion();
    }

    if (this.tokenhome == null) {
      this.router.navigateByUrl('/login');//cambiar a bienvenido
    }
    this.SeterUsuario();
    
  }


  async SeterUsuario() {
    this.listaUsuarios.forEach(element => {
      element.forEach(data => {
        if (data.mail == this.auth.currentUser) {
          this.usuarioIngresado.id = data.id;
          this.usuarioIngresado.categoria = data.categoria;
          this.usuarioIngresado.habilitado = data.habilitado;
          this.usuarioIngresado.nombre = data.nombre;
          this.usuarioIngresado.apellido = data.apellido;
          this.usuarioIngresado.edad = data.edad;
          this.usuarioIngresado.dni = data.dni;

          this.usuarioIngresado.obraSocial = data.obraSocial;
          this.usuarioIngresado.especialidad = data.especialidad;
          this.usuarioIngresado.mail = data.mail;
          this.usuarioIngresado.pass = data.pass;
          this.usuarioIngresado.fotoUno = data.fotoUno;
          this.usuarioIngresado.fotoDos = data.fotoDos;

          //console.log(data);
        }
      });
    });

  }

  CerrarSesion(){
    this.auth.logout();
    localStorage.removeItem('token');
    //No se si poner que retorne a la pagina de bienvenido
    this.router.navigateByUrl('/login');
  }

}
