import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Mensajes } from 'src/app/clases/mensajes';
import { User } from 'src/app/clases/user';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { telefonoValido } from 'src/app/validaciones/validaciones';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {
  perfil: User = {}
enviarMensajes:boolean=false
editarMensajes:boolean=false
  formNuevo: FormGroup = new FormGroup({
    id: new FormControl(''),
    titulo: new FormControl('',Validators.required),
    contenido: new FormControl('', Validators.required)
  })
  formPerfil=this.fb.group({
    nombre:[''],
    apellidos:[''],
    password:['',Validators.minLength(4)],
    email:['', [Validators.required]],
    pais:['', [Validators.required]],
    sexo:['', [Validators.required]],
    telefono:[undefined, [telefonoValido()]],
  })
  mensajeNuevo: Mensajes = new Mensajes();
  mensajeSeleccionado: Mensajes = new Mensajes();
  mensajes: Mensajes[]=[];
  temporizador: any = null;
  creada :boolean=false;
  eliminada :boolean=false;
  editada :boolean=false;
  activado:boolean=false;
  mensaje:string='';
  constructor(private servicio:MensajesService,private fb:FormBuilder, private servicioUsuario:UsuariosService) { }

  ngOnInit(): void {
    this.escribirMensajes();
    this.cargarPerfil();
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
  

  escribirMensajes():void{
    this.servicio.leerMensajes().subscribe(
      respuesta=>{
        console.log(respuesta);
        this.mensajes=respuesta
        
      },
      error=>console.log(error)
    )
  }

  crearMensaje(entrada:Mensajes): void{
    this.servicio.insertarMensaje(entrada).subscribe(
      respuesta=>{
        console.log(respuesta);
        this.formNuevo.reset();
        this.creada=true;
        this.mensaje="Se ha insertado el mensaje correctamente"
        this.activado=true
        setTimeout(()=>{this.creada=false},3000);
        this.escribirMensajes();
      },
      error=>console.log(error)
    )
  }

  eliminarMensaje(): void{
    this.servicio.borrarMensaje(this.formNuevo.value.id).subscribe(
      respuesta => {console.log(respuesta)
      this.formNuevo.reset()
      this.eliminada=true
      this.mensaje="Se ha eliminado el mensaje correctamente"
      this.activado=true
      this.escribirMensajes()
      },
      error => {console.log(error)}
    )
  }

  editarMensaje():void{
    this.servicio.editarMensaje(this.formNuevo.value).subscribe(
      respuesta=>{
        console.log(respuesta);
        this.formNuevo.reset();
        this.editada=true;
        this.mensaje="Se ha editado el mensaje correctamente"
        this.activado=true
        setTimeout(()=>{this.editada=false},3000);
        this.escribirMensajes();
      },
      error=>console.log(error)
    )
  }

  
}