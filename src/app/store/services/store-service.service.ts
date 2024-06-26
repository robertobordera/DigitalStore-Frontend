import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Carrito, Producto, ProductoValoracion, anyadirCarrito } from '../interfaces/productos';
import { CarritoResponse,CarritoResponse2, ProductoCategoriaResponse, ProductosResponse, ProductosValoracionesResponse } from '../interfaces/responses';
import { ProductoResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root',
})
export class StoreServiceService {
  #http = inject(HttpClient);
  #productosUrl = 'productos';
  #carritoUrl = 'carrito';

  obtenerProductos(categoria?:number,numero?:number): Observable<Producto[]> {
    if(categoria && numero){
      return this.#http
      .get<ProductosResponse>(`${this.#productosUrl}/limit/${numero}/categoria/${categoria}`)
      .pipe(map((resp) => resp.datas));
    }
    else if(categoria){
      return this.#http
      .get<ProductosResponse>(`${this.#productosUrl}/categoria/${categoria}`)
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

  AnyadirCarrito(data:anyadirCarrito):Observable<CarritoResponse>{
    return this.#http.post<CarritoResponse>(`${this.#carritoUrl}/añadir_carrito`,data)
  }

  ObtenerCarrito(id:number):Observable<Carrito[]>{
    return this.#http.get<CarritoResponse2>(`${this.#carritoUrl}/mostrar_carrito/${id}`)
    .pipe(map((resp)=>resp.carritoProducts))
  }

  eliminarProductoCarrito(idUsuario:number,idProducto:number):Observable<CarritoResponse>{
    return this.#http.delete<CarritoResponse>(`${this.#carritoUrl}/usuario/${idUsuario}/borrar/${idProducto}`)
  }

  vaciarCarrito(idUsuario:number):Observable<CarritoResponse>{
    return this.#http.delete<CarritoResponse>(`${this.#carritoUrl}/usuario/${idUsuario}/vaciar`)
  }
}
