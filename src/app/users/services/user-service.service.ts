import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserDireccion, UserNombre, UserPasswordEdit, Users, anyadirFavorito, leerResenya, mail, solicitud, usuarioCorreo } from '../../auth/interfaces/users';
import { UsuarioCorreoResponse, UsuarioDireccionResponse, UsuarioNombreResponse, UsuarioPasswordResponse, UsuarioResponse, leerResenyaResponse, mailResponse } from '../../auth/interfaces/responses';
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
  #reseñaUrl = 'reseña';

  obtenerMisDatos():Observable<Users>{
    return this.#http.get<UsuarioResponse>(`${this.#productosUrl}/me`)
    .pipe(map((resp)=>resp.usuario));
  }
  obtenerDatosUsuario(id :number):Observable<Users>{
    return this.#http.get<UsuarioResponse>(`${this.#productosUrl}/datos/${id}`)
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

  actualizarNombre(datos:FormData):Observable<UsuarioDireccionResponse>{
    return this.#http.put<UsuarioDireccionResponse>(`${this.#productosUrl}/actualizarNombre`,datos)
  }

  AnyadirFavorito(data:anyadirFavorito):Observable<CarritoResponse>{
    return this.#http.post<CarritoResponse>(`${this.#favoritosUrl}/anyadir_favorito`,data)
  }

  ObtenerFavorito(me:number | string):Observable<marketPlace[]>{
    const meStr = String(me);
    return this.#http.get<marketplaceResponse>(`${this.#favoritosUrl}/mostrar_favoritos/${meStr}`)
    .pipe(map((resp)=>resp.data))
  }

  eliminarProductoFavorito(idUsuario:number,idProductousu:number):Observable<CarritoResponse>{
    return this.#http.delete<CarritoResponse>(`${this.#favoritosUrl}/usuario/${idUsuario}/borrar/${idProductousu}`)
  }

  obtenerMisProductos(me:number | string):Observable<marketPlace[]>{
    const meStr = String(me);
    return this.#http.get<marketplaceResponse>(`${this.#productosUrl}/misProductos/${meStr}`)
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

  mostrarMensajes2(id:number):Observable<mail[]>{
    return this.#http.get<mailResponse>(`${this.#solicitudUrl}/solicitudes2/${id}`)
    .pipe(map((resp)=>resp.solicitud));
  }

  enviarSolicitud(solicitud:solicitud):Observable<void>{
    return this.#http.post<void>(`${this.#solicitudUrl}/enviar`,solicitud)
  }

  obtenerMisReseñasRealizadas(me:number | string):Observable<leerResenya[]>{
    const meStr = String(me);
    return this.#http.get<leerResenyaResponse>(`${this.#reseñaUrl}/realizadas/${meStr}`)
    .pipe(map((resp)=>resp.data))
  }

  obtenerMisReseñasRecibidas(me:number | string):Observable<leerResenya[]>{
    const meStr = String(me);
    return this.#http.get<leerResenyaResponse>(`${this.#reseñaUrl}/recibidas/${meStr}`)
    .pipe(map((resp)=>resp.data))
  }
}
