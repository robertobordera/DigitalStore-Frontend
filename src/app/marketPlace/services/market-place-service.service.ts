import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { comentariosResponse, comentariosSingleResponse, marketplaceResponse, marketplaceSingleResponse } from '../interfaces/responses';
import { CommentInsert, comentarios, marketPlace } from '../interfaces/marketPlace';

@Injectable({
  providedIn: 'root'
})
export class MarketPlaceServiceService {

  constructor() { }

  #http = inject(HttpClient);
  #productosUrl = 'marketPlace';

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

  subirComentario(id:number,data:CommentInsert):Observable<comentarios>{
    return this.#http.post<comentariosSingleResponse>(`${this.#productosUrl}/${id}/comentarios`,data)
    .pipe(map((resp)=>resp.comentario))
  }

  ventas(idUsuario:number,idProducto:number):Observable<void>{
    return this.#http.get<void>(`${this.#productosUrl}/${idUsuario}/productos/${idProducto}`)
  }
}
