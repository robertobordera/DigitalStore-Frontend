import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto, ProductoValoracion, anyadirCarrito } from '../interfaces/productos';
import { StoreServiceService } from '../services/store-service.service';
import { CommonModule } from '@angular/common';
import { Users } from '../../auth/interfaces/users';
import { UserService } from '../../users/services/user-service.service';
import Swal from 'sweetalert2';

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
  usuario!:Users
  valoraciones:ProductoValoracion[] = [];
  count = 0;
  imagen:boolean = true;

  @Input() id!: number;
  #productosServices = inject(StoreServiceService)
  #userService = inject(UserService);
  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
      this.#productosServices.obtenerProducto(this.id).subscribe({
        next:(producto)=>{
          this.producto = producto
        },
        error:(error) => console.error(error)
      })

      this.#productosServices.obtenerProductos(1,5).subscribe({
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

      this.#userService.obtenerMisDatos().subscribe({
        next: (usuario) => {
          this.usuario = usuario;
          console.log(this.usuario);
        },
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.ensenyarImagen();
    }, 3000);
  }
  
  ensenyarImagen() {
    this.imagen = false;
  }

  elementoDetalle(id:number){
    
    this.#router.navigate(['/store',id])
  }

  anyadirCarrito(producto_id:number,usuario_id:number){
    const añadir:anyadirCarrito = {
      producto_id:producto_id,
      usuario_id:usuario_id
    }

    this.#productosServices.AnyadirCarrito(añadir).subscribe(
      (response) =>{
        if(response.success){
          Swal.fire({
            title: response.message,
            icon: 'success',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
          });

        }
      }
    )
  }
}
