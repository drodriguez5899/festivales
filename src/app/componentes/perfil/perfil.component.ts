import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { User } from 'src/app/clases/user';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { telefonoValido } from 'src/app/validaciones/validaciones';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  perfil: User = {}
  mostrarEditar: boolean=false
  mostrarEliminar: boolean=false
  inputBorrar: string = ''
  mensaje:string=''
  mensaje2:string=''
  activado:boolean=false
  formPerfil=this.fb.group({
    nombre:[''],
    apellidos:[''],
    password:['',Validators.minLength(4)],
    email:['', [Validators.required]],
    pais:['', [Validators.required]],
    sexo:['', [Validators.required]],
    telefono:[undefined, [telefonoValido()]],
  })
  formImagen = this.fb.group({
    imagen: ['', Validators.required]
  })

  constructor(private fb:FormBuilder, private servicioUsuario:UsuariosService, private irHacia:Router) { }

  ngOnInit(): void {
    this.cargarPerfil()
  }

  cargarPerfil():void{
    this.servicioUsuario.obtenerPerfil().subscribe(
      respuesta =>{
      console.log(respuesta)
      this.perfil=respuesta
      this.formPerfil.patchValue(respuesta)
      },
      error => console.log(error)
    )
  }
  editarPerfil():void{
    this.servicioUsuario.editarPerfil(this.formPerfil.value).subscribe(
      respuesta => {
        console.log(respuesta)
        this.cargarPerfil()
        this.mostrarEditar = false
        this.activado= true
        this.mensaje="se ha editado correctamente"

      },
      error =>{
        console.log(error)
        this.mensaje2=error.error.error
      } 
    )
  }
  eliminarUsuario():void{
    this.servicioUsuario.eliminarUsuario().subscribe(
      respuesta => {
        console.log(respuesta)
        this.servicioUsuario.logOut()
        this.irHacia.navigate(['/login'])
        this.activado= true
        this.mensaje="se ha eliminado correctamente"
      },
      error =>{
        console.log(error)
        this.mensaje2=error.error.error
      } 
    )
  }
  /*subirImagen():void{
    const formData = new FormData()
    formData.append('imagen',this.formImagen.get('imagen').value)
    this.servicioUsuario.subirImagen(formData).subscribe(
      respuesta => {
        console.log(respuesta)
        this.cargarPerfil()
        this.activado= true
        this.mensaje="se ha subido una imagen correctamente"
      },
      error =>{console.log(error)}
    )
  }
  cambiaImagen(evento):void{
    if(evento.target.files){
      this.formImagen.get('imagen').setValue(evento.target.files[0])
      this.activado= true
        this.mensaje="se ha ha cambiado la imagen correctamente"
    }
  }*/
}