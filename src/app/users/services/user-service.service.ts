import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserDireccion, UserNombre, UserPasswordEdit, Users, anyadirFavorito, mail, solicitud, usuarioCorreo } from '../../auth/interfaces/users';
import { UsuarioCorreoResponse, UsuarioDireccionResponse, UsuarioNombreResponse, UsuarioPasswordResponse, UsuarioResponse, mailResponse } from '../../auth/interfaces/responses';
import { CarritoResponse } from '../../store/interfaces/responses';
import { marketPlace, ventas } from '../../marketPlace/interfaces/marketPlace';
import { marketplaceResponse, ventasResponse } from '../../marketPlace/interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  #http = inject(HttpClient);
  #productosUrl = 'usuarios';
  #favoritosUrl = 'favoritos';
  #solicitudUrl = 'solicitud';

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

  AnyadirFavorito(data:anyadirFavorito):Observable<CarritoResponse>{
    return this.#http.post<CarritoResponse>(`${this.#favoritosUrl}/anyadir_favorito`,data)
  }

  ObtenerFavorito(id:number):Observable<marketPlace[]>{
    return this.#http.get<marketplaceResponse>(`${this.#favoritosUrl}/mostrar_favoritos/${id}`)
    .pipe(map((resp)=>resp.data))
  }

  eliminarProductoFavorito(idUsuario:number,idProductousu:number):Observable<CarritoResponse>{
    return this.#http.delete<CarritoResponse>(`${this.#favoritosUrl}/usuario/${idUsuario}/borrar/${idProductousu}`)
  }

  obtenerMisProductos():Observable<marketPlace[]>{
    return this.#http.get<marketplaceResponse>(`${this.#productosUrl}/misProductos`)
    .pipe(map((resp)=>resp.data))
  }

  obtenerMisVentas():Observable<ventas[]>{
    return this.#http.get<ventasResponse>(`${this.#productosUrl}/misVentas`)
    .pipe(map((resp)=>resp.data))
  }

  mostrarMensajes(id:number):Observable<mail[]>{
    return this.#http.get<mailResponse>(`${this.#solicitudUrl}/solicitudes/${id}`)
    .pipe(map((resp)=>resp.solicitud));
  }

  enviarSolicitud(solicitud:solicitud):Observable<void>{
    return this.#http.post<void>(`${this.#solicitudUrl}/enviar`,solicitud)
  }
}
