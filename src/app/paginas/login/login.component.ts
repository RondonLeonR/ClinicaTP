import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: any;
  public pass: any;

  userEspUno: Usuario;
  userEspDos: Usuario;
  userPacUno: Usuario;
  userPacDos: Usuario;
  userAdmin: Usuario;

  seleccionePaciente = false;
  seleccioneEspecialista = false;
  seleccioneAdmin = false;

  constructor(
    private auth: AuthService,
    private router: Router) {
    this.userEspUno = new Usuario();
    this.userEspDos = new Usuario();
    this.userPacUno = new Usuario();
    this.userPacDos = new Usuario();
    this.userAdmin = new Usuario();
  }

  ngOnInit(): void {
    this.CargarUsuarios();
  }

  async onLogin() {
    try {
      const user = await this.auth.login(this.email, this.pass);
      //console.log(user);
      if (user && user.user.emailVerified) {
        this.auth.currentUser = this.email;
        localStorage.setItem('token', this.email);

        this.router.navigate(['home']);
      }
      else if (user) {
        this.router.navigate(['verificacionEmail']);
      }
      else {
        //console.log("no se pudo ingresar bien");
        this.router.navigate(['login']);
      }
    } catch (error) {

    }
  }

  CargarUsuarios() {

    ///Especialista uno. 
    //NeuroCirujano y Nutricionista
    this.userEspUno.nombre = "Hugo";
    this.userEspUno.apellido = "Duarte";
    this.userEspUno.dni = 43214321;
    this.userEspUno.edad = 23;
    this.userEspUno.fotoUno = "https://firebasestorage.googleapis.com/v0/b/tpfinal-f585b.appspot.com/o/fotos%2FPQKmtVyRvzbU4C4Kb4S7Rw8vZL92%2F1.png?alt=media&token=1ae3b184-4f8d-499a-8a84-205b95228fa4";
    this.userEspUno.mail = "terducerki@biyac.com";
    this.userEspUno.pass = "123123";

    ///Especialista dos. 
    //Nutricionista, Otorrino y Pediatria
    this.userEspDos.nombre = "Maribel";
    this.userEspDos.apellido = "Perez";
    this.userEspDos.dni = 45454556;
    this.userEspDos.edad = 55;
    this.userEspDos.fotoUno = "https://firebasestorage.googleapis.com/v0/b/tpfinal-f585b.appspot.com/o/fotos%2FDk758zNai8eE3XUG2p5dKDtxTTE3%2F1.png?alt=media&token=4dca95bc-637d-4645-af8e-15cb335c370d";
    this.userEspDos.mail = "nardecokki@biyac.com";
    this.userEspDos.pass = "123123";


    ///Paciente uno.
    this.userPacUno.nombre = "Jose";
    this.userPacUno.apellido = "Quiros";
    this.userPacUno.dni = 34343434;
    this.userPacUno.edad = 33;
    this.userPacUno.fotoUno = "https://firebasestorage.googleapis.com/v0/b/tpfinal-f585b.appspot.com/o/fotos%2Frotrinospu%40biyac.com%2F1.png?alt=media&token=629f96fb-f0a8-47b0-8c71-ef6c3599b07f";
    this.userPacUno.fotoDos = "https://firebasestorage.googleapis.com/v0/b/tpfinal-f585b.appspot.com/o/fotos%2Frotrinospu%40biyac.com%2F2.png?alt=media&token=7bd89ed3-43ff-4d1e-bd8c-c3515e349a90";
    this.userPacUno.mail = "rotrinospu@biyac.com";
    this.userPacUno.pass = "123123";

    ///Paciente dos.
    this.userPacDos.nombre = "Ander";
    this.userPacDos.apellido = "Gimenez";
    this.userPacDos.dni = 45454545;
    this.userPacDos.edad = 33;
    this.userPacDos.fotoUno = "https://firebasestorage.googleapis.com/v0/b/tpfinal-f585b.appspot.com/o/fotos%2Fkignuzerto%40biyac.com%2F1.png?alt=media&token=f49835f8-dc97-49f8-8175-e0378571c8a9";
    this.userPacDos.fotoDos = "https://firebasestorage.googleapis.com/v0/b/tpfinal-f585b.appspot.com/o/fotos%2Fkignuzerto%40biyac.com%2F2.png?alt=media&token=5cdce9d8-a69f-4429-a493-4f862bf8517d";
    this.userPacDos.mail = "kignuzerto@biyac.com";
    this.userPacDos.pass = "123123";


    ///Admin
    this.userAdmin.nombre = "Rodolfo";
    this.userAdmin.apellido = "Rondon";
    this.userAdmin.dni = 41246791;
    this.userAdmin.edad = 22;
    this.userAdmin.fotoUno = "https://firebasestorage.googleapis.com/v0/b/tpfinal-f585b.appspot.com/o/fotos%2FtVj83OPFZBfWsx8NJUns9Cpq76R2%2F1.png?alt=media&token=6c14f141-7d92-4aa5-b945-85e51440ab90";
    this.userAdmin.mail = "rodorondon98@gmail.com";
    this.userAdmin.pass = "123123";

  }

  AccesoRapido(aux: string) {
    if (aux == 'esp') {
      if (this.seleccioneEspecialista) {
        this.seleccioneEspecialista = false;
      } else {
        this.seleccioneEspecialista = true;
        this.seleccioneAdmin = false;
        this.seleccionePaciente = false;

        
      }
    }

    if (aux == 'pac') {
      if (this.seleccionePaciente) {
        this.seleccionePaciente = false;
      } else {
        this.seleccionePaciente = true;
        this.seleccioneEspecialista = false;
        this.seleccioneAdmin = false;
      }
    }

    if (aux == 'admin') {
      if (this.seleccioneAdmin) {
        this.seleccioneAdmin = false;
      } else {
        this.seleccioneAdmin = true;
        this.seleccioneEspecialista = false;
        this.seleccionePaciente = false;
      }
    }
  }


  SeleccionarUsuario(user){
    this.email = user.mail;
    this.pass = user.pass;
  }

}
