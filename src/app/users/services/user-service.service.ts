import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserDireccion, UserNombre, UserPasswordEdit, Users, usuarioCorreo } from '../../auth/interfaces/users';
import { UsuarioCorreoResponse, UsuarioDireccionResponse, UsuarioNombreResponse, UsuarioPasswordResponse, UsuarioResponse } from '../../auth/interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  #http = inject(HttpClient);
  #productosUrl = 'usuarios';

  obtenerMisDatos():Observable<Users>{
    return this.#http.get<UsuarioResponse>(`${this.#productosUrl}/me`)
    .pipe(map((resp)=>resp.usuario));
  }

  actualizarCorreo(datos:usuarioCorreo):Observable<UsuarioCorreoResponse>{
    return this.#http.put<UsuarioCorreoResponse>(`${this.#productosUrl}/actualizarCorreo`,datos)
  }

  actualizarPassword(datos:UserPasswordEdit):Observable<UsuarioPasswordResponse>{
    return this.#http.put<UsuarioPasswordResponse>(`${this.#productosUrl}/actualizarPassword`,datos)
  }

  actualizarDireccion(datos:UserDireccion):Observable<UsuarioDireccionResponse>{
    return this.#http.put<UsuarioDireccionResponse>(`${this.#productosUrl}/actualizarDireccion`,datos)
  }

  actualizarNombre(datos:UserNombre):Observable<UsuarioNombreResponse>{
    return this.#http.put<UsuarioNombreResponse>(`${this.#productosUrl}/actualizarNombre`,datos)
  }
}
