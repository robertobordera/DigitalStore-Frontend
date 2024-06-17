import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, pipe } from 'rxjs';
import { comentariosResponse, comentariosSingleResponse, marketplaceResponse, marketplaceSingleResponse, productoVendedorSingleResponse, subirResenyaResponse, subirResponse } from '../interfaces/responses';
import { CommentInsert, comentarios, marketPlace, productoVendedor, subirProducto, subirResenya } from '../interfaces/marketPlace';

@Injectable({
  providedIn: 'root'
})
export class MarketPlaceServiceService {

  constructor() { }

  #http = inject(HttpClient);
  #productosUrl = 'marketPlace';
  #reseñaUrl = 'reseña';

  obtenerMarketProductos():Observable<marketPlace[]>{
    return this.#http.get<marketplaceResponse>(`${this.#productosUrl}/productos`)
    .pipe(map((resp)=>resp.data)
    )
  }

  obtenerMarketProducto(id:number):Observable<marketPlace>{
    return this.#http.get<marketplaceSingleResponse>(`${this.#productosUrl}/producto/${id}`)
    .pipe(map((resp)=>resp.data)
    )
  }

  obtenerComentarios(id:number):Observable<comentarios[]>{
    return this.#http.get<comentariosResponse>(`${this.#productosUrl}/productos/comentarios/${id}`)
    .pipe(map((resp)=> resp.comentarios))
  }

  subirComentario(id:number,data:comentarios):Observable<comentarios>{
    return this.#http.post<comentariosSingleResponse>(`${this.#productosUrl}/${id}/comentarios`,data)
    .pipe(map((resp)=>resp.comentario))
  }

  ventas(idUsuario:number,idProducto:number):Observable<void>{
    return this.#http.get<void>(`${this.#productosUrl}/${idUsuario}/productos/${idProducto}`)
  }
  obtenerDatosReseña(id:number):Observable<productoVendedor>{
    return this.#http.get<productoVendedorSingleResponse>(`${this.#productosUrl}/datosProductoVendedor/${id}`)
    .pipe(map((resp)=>resp.data))
  }

  subirProducto(data:FormData):Observable<subirResponse>{
    return this.#http.post<subirResponse>(`${this.#productosUrl}/subirProducto`,data)
    .pipe(map((resp)=>resp))
  }

  subirResenya(data:subirResenya):Observable<subirResenyaResponse>{
    return this.#http.post<subirResenyaResponse>(`${this.#reseñaUrl}/enviar`,data)
    .pipe(map((resp)=>resp))
  }

}
