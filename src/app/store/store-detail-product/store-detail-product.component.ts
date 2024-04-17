import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto, ProductoValoracion } from '../interfaces/productos';
import { StoreServiceService } from '../services/store-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-store-detail-product',
  standalone: true,
  imports: [],
  templateUrl: './store-detail-product.component.html',
  styleUrl: './store-detail-product.component.scss'
})
export class StoreDetailProductComponent implements OnInit{
  #router = inject(Router);
  producto!:Producto;
  productos:Producto[] = [];
  valoraciones:ProductoValoracion[] = [];
  count = 0;

  @Input() id!: number;
  #productosServices = inject(StoreServiceService)
  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
      this.#productosServices.obtenerProducto(this.id).subscribe({
        next:(producto)=>{
          this.producto = producto
        },
        error:(error) => console.error(error)
      })

      this.#productosServices.obtenerProductos().subscribe({
        next:(productos)=>{
          this.productos = productos
        },
        error:(error) => console.error(error)
      })

      this.#productosServices.obtenerValoracionProductos(this.id).subscribe({
        next:(valoraciones)=>{
          this.valoraciones = valoraciones
        },
        error:(error) => console.error(error)
      })
  }

  elementoDetalle(id:number){
    
    this.#router.navigate(['/store',id])
  }
}
