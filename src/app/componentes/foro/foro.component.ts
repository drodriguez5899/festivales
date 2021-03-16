import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Mensajes } from 'src/app/clases/mensajes';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {

  formNuevo: FormGroup = new FormGroup({
    id: new FormControl(''),
    titulo: new FormControl('',Validators.required),
    contenido: new FormControl('', Validators.required)
  })
  mensajeNuevo: Mensajes = new Mensajes();
  mensajeSeleccionado: Mensajes = new Mensajes();
  mensajes: Mensajes[]=[];
  temporizador: any = null;
  creada :boolean=false;
  eliminada :boolean=false;
  editada :boolean=false;
  constructor(private servicio:MensajesService) { }

  ngOnInit(): void {
    this.escribirMensajes();
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
        setTimeout(()=>{this.editada=false},3000);
        this.escribirMensajes();
      },
      error=>console.log(error)
    )
  }

  
}