import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import "@angular/common/locales/global/es";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './componentes/navegacion/navegacion.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ForoComponent } from './componentes/foro/foro.component';
import { EnviartokenInterceptor } from './auth/enviartoken.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    HomeComponent,
    LoginComponent,
    PerfilComponent,
    RegistroComponent,
    ForoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[
    {provide: LOCALE_ID, useValue:"es"},
    {provide:HTTP_INTERCEPTORS, useClass:EnviartokenInterceptor, multi:true}    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
