import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensajes } from '../clases/mensajes';
const url = 'http://localhost/backendFestival/mensajes/';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor( private http:HttpClient) { }

  leerMensajes(): Observable<any>{
    return this.http.get(url)
  }

  insertarMensaje(mensaje:Mensajes): Observable<any>{
    return this.http.post(url, mensaje)
  }

  leerMensaje(id:number): Observable<any>{
    return this.http.get(url+id)
  }
  editarMensaje(mensaje:Mensajes):Observable<any>{
    return this.http.put(url,mensaje)
  }
  borrarMensaje(id:number):Observable<any>{
    return this.http.delete(url+id)
  }
  buscarMensajes(entrada:string):Observable<any>{
    return this.http.get(url + '?busqueda=' + entrada)
  }
}
