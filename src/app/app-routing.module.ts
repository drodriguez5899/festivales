import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForoComponent } from './componentes/foro/foro.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RegistroComponent } from './componentes/registro/registro.component';

const routes: Routes = [
  {path: "", component:HomeComponent},
  {path: "registro", component:RegistroComponent},
  {path: "login", component:LoginComponent},
  {path: "foro", component:ForoComponent},
  {path: "perfil", component:PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
