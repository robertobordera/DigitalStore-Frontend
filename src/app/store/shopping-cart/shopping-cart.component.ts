import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from '../interfaces/productos';
import { StoreServiceService } from '../services/store-service.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit{

  #router = inject(Router);
  carritos:Carrito[] = [];
  #productosServices = inject(StoreServiceService)
  sumar = 0;
  @Input() id!: number;
  
  ngOnInit(): void {
    this.#productosServices.ObtenerCarrito(this.id).subscribe({
      next:(producto)=>{
        this.carritos = producto
      }
    })

    this.sumar = this.carritos.reduce((acc, val) => acc + parseFloat(val), 0);
  }
}
