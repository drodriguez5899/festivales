import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  constructor(private servicioUsuario:UsuariosService, private irHacia:Router) { }

  ngOnInit(): void {
  }

  doLogout():void{
    this.servicioUsuario.logOut()
    this.irHacia.navigate(['/login'])
  }
  fnLogged():boolean{
    return this.servicioUsuario.isLogged()
  }


}
