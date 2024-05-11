import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { marketPlace, ventas } from '../../marketPlace/interfaces/marketPlace';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.scss'
})
export class MyProductsComponent implements OnInit{

  enVentaActivo: boolean = true;
  vendidoActivo: boolean = false;
  #userService = inject(UserService);
  marketPlace:marketPlace[] = [];
  ventas:ventas[] = [];

  ngOnInit(): void {
      this.#userService.obtenerMisProductos().subscribe({
        next:(resp)=>{
          this.marketPlace = resp
        }
      })

      this.#userService.obtenerMisVentas().subscribe({
        next:(resp)=>{
          this.ventas = resp
        }
      })
  }
  activarEnVenta() {
    this.enVentaActivo = true;
    this.vendidoActivo = false;
  }

  activarVendido() {
    this.enVentaActivo = false;
    this.vendidoActivo = true;
  }
}
