import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensaje:string=''
  formLogin=this.fb.group({    
    password:['',[Validators.required]],
    email:['', [Validators.required, Validators.email]],
   
  })
  constructor(private fb:FormBuilder, private servicioUsuario:UsuariosService, private irHacia:Router) { }

  ngOnInit(): void {
  
 
  }
  login(){ 
      this.servicioUsuario.acceso(this.formLogin.value).subscribe(
        respuesta => {
          console.log(respuesta)
          this.servicioUsuario.guardarToken(respuesta)
          this.irHacia.navigate(['/perfil'])
          alert("has iniciado sesion")
        },
        error =>{
          console.log(error)
          this.mensaje=error.error.error
        } 
      )
   
  }


}
