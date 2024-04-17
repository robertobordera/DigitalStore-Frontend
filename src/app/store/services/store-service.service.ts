import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Producto, ProductoValoracion } from '../interfaces/productos';
import { ProductoCategoriaResponse, ProductosResponse, ProductosValoracionesResponse } from '../interfaces/responses';
import { ProductoResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root',
})
export class StoreServiceService {
  #http = inject(HttpClient);
  #productosUrl = 'productos';

  obtenerProductos(id?:number): Observable<Producto[]> {
    if(id){
      return this.#http
      .get<ProductosResponse>(`${this.#productosUrl}/categoria/${id}`)
      .pipe(map((resp) => resp.datas));
    }
    else{
      return this.#http
      .get<ProductosResponse>(this.#productosUrl)
      .pipe(map((resp) => resp.datas));
    }
   
  }

  obtenerProducto(id:number): Observable<Producto> {
    return this.#http
      .get<ProductoResponse>(`${this.#productosUrl}/${id}`)
      .pipe(map((resp) => resp.data));
  }

  obtenerValoracionProductos(id:number):Observable<ProductoValoracion[]>{
    return this.#http
    .get<ProductosValoracionesResponse>(`${this.#productosUrl}/${id}/valoraciones`)
    .pipe(map((resp)=>resp.valoraciones))
  }

  ObtenerProductosCategoria(id:number):Observable<Producto[]>{
    return this.#http
    .get<ProductoCategoriaResponse>(`${this.#productosUrl}/categoria/${id}`)
    .pipe(map((resp) => resp.productoCategoria))
  }
}
