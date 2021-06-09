import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';
import { ErrorComponent } from './paginas/error/error.component';
import { RegisterCComponent } from './paginas/register-c/register-c.component';
import { RegisterEComponent } from './paginas/register-e/register-e.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './paginas/home/home.component';
import { VerificacionEmailComponent } from './paginas/verificacion-email/verificacion-email.component';
import { RegisterAdminComponent } from './paginas/register-admin/register-admin.component';
import { BienvenidoComponent } from './paginas/bienvenido/bienvenido.component';
import { HabilitarEspecialidadComponent } from './paginas/admin/habilitar-especialidad/habilitar-especialidad.component';

//Captcha
import { NgxCaptchaModule } from 'ngx-captcha';
import { HomePacienteComponent } from './paginas/paciente/home-paciente/home-paciente.component';
import { GestionarHorariosComponent } from './paginas/especialista/gestionar-horarios/gestionar-horarios.component';
import { GestionarTurnosComponent } from './paginas/especialista/gestionar-turnos/gestionar-turnos.component';
import { SolicitarTurnoComponent } from './paginas/admin/solicitar-turno/solicitar-turno.component';
import { CreacionPDFComponent } from './paginas/creacion-pdf/creacion-pdf.component';
import { EstadosDirective } from './directivas/estados.directive';
import { MisTurnosComponent } from './paginas/paciente/mis-turnos/mis-turnos.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { MiPerfilComponent } from './paginas/paciente/mi-perfil/mi-perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    RegisterCComponent,
    RegisterEComponent,
    HomeComponent,
    VerificacionEmailComponent,
    RegisterAdminComponent,
    BienvenidoComponent,
    HabilitarEspecialidadComponent,
    HomePacienteComponent,
    GestionarHorariosComponent,
    GestionarTurnosComponent,
    SolicitarTurnoComponent,
    CreacionPDFComponent,
    EstadosDirective,
    MisTurnosComponent,
    FiltroPipe,
    MiPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NgxCaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
