import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePacienteComponent } from '../app/paginas/paciente/home-paciente/home-paciente.component';
import { BotonesSolicitarTurnoComponent } from './componentes/botones-solicitar-turno/botones-solicitar-turno.component';

import { HabilitarEspecialidadComponent } from './paginas/admin/habilitar-especialidad/habilitar-especialidad.component';
import { SolicitarTurnoComponent } from './paginas/admin/solicitar-turno/solicitar-turno.component';
import { BienvenidoComponent } from './paginas/bienvenido/bienvenido.component';
import { CreacionPDFComponent } from './paginas/creacion-pdf/creacion-pdf.component';
import { ErrorComponent } from './paginas/error/error.component';
import { BarraTurnosDiasComponent } from './paginas/especialista/barra-turnos-dias/barra-turnos-dias.component';
import { GestionarHorariosComponent } from './paginas/especialista/gestionar-horarios/gestionar-horarios.component';
import { GestionarTurnosComponent } from './paginas/especialista/gestionar-turnos/gestionar-turnos.component';
import { OperacionesEspecialidadComponent } from './paginas/especialista/operaciones-especialidad/operaciones-especialidad.component';
import { SeccionUsuariosComponent } from './paginas/especialista/seccion-usuarios/seccion-usuarios.component';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';
import { MiPerfilComponent } from './paginas/paciente/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from './paginas/paciente/mis-turnos/mis-turnos.component';
import { RegisterAdminComponent } from './paginas/register-admin/register-admin.component';
import { RegisterCComponent } from './paginas/register-c/register-c.component';
import { RegisterEComponent } from './paginas/register-e/register-e.component';
import { VerificacionEmailComponent } from './paginas/verificacion-email/verificacion-email.component';

const routes: Routes = [
  {
    ///Cambiar al bienvenido
    path: '', redirectTo: '/bienvenido', pathMatch: 'full'
  },
  {
    path: 'bienvenido', component: BienvenidoComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registro',
    children: [
      {
        path: 'registerPaciente', component: RegisterCComponent
      },
      {
        path: 'registerEspecialidad', component: RegisterEComponent
      },
      {
        path: 'registerAdmin', component: RegisterAdminComponent
      },
    ]
  },
  {
    path: 'admin',
    children: [
      {
        path: 'habilitarEspecialista', component: HabilitarEspecialidadComponent
      },
      {
        path: 'solicitarTurno', component: SolicitarTurnoComponent
      },
    ]
  },
  {
    path: 'paciente',
    children: [
      {
        path: 'homePaciente', component: HomePacienteComponent
      },
      {
        path: 'misTurnos', component: MisTurnosComponent
      },
      {
        path: 'miPerfil', component: MiPerfilComponent
      },
    ]
  },
  {
    path: 'especialista',
    children: [
      {
        path: 'gestionarHorarios', component: GestionarHorariosComponent
      },
      {
        path: 'gestionarTurnos', component: GestionarTurnosComponent
      },
      {
        path: 'seccionPacientes', component: SeccionUsuariosComponent
      },
      {
        path: 'graficoBarras', component: BarraTurnosDiasComponent
      },
      {
        path: 'graficoPieOperacionesEsp', component: OperacionesEspecialidadComponent
      },
      //Borrar esto despues
      {
        path: 'borrarEsto', component: BotonesSolicitarTurnoComponent
      }
    ]
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'verificacionEmail', component: VerificacionEmailComponent
  },
  {
    path: 'creacionPDF', component: CreacionPDFComponent
  },
  {
    path: '**' , component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
