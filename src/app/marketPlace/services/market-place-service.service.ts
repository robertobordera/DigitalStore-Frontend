import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { marketplaceResponse, marketplaceSingleResponse } from '../interfaces/responses';
import { marketPlace } from '../interfaces/marketPlace';

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
}
