import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto, anyadirCarrito } from '../interfaces/productos';
import { StoreServiceService } from '../services/store-service.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { AuthServiceService } from '../../auth/services/auth-service.service';
import { UserService } from '../../users/services/user-service.service';
import { Users } from '../../auth/interfaces/users';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-store-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store-product.component.html',
  styleUrl: './store-product.component.scss',
})
export class StoreProductComponent implements OnInit {
  #location = inject(Location);
  #router = inject(Router);
  productos: Producto[] = [];
  usuario!:Users
  #productosServices = inject(StoreServiceService);
  #authServices = inject(UserService);
  id!: number;
  $valorURL: string = "";

  constructor(private route: ActivatedRoute) {}

  // modificarURLFicticia(valor: string) {
  //   const nuevaURL = this.#location.path().replace('store', `store/${valor}`);
  //   this.#location.replaceState(nuevaURL);
  // }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['categoria']) {
        this.id = params['categoria'];
        this.#productosServices.obtenerProductos(this.id).subscribe({
          next: (productos) => {
            this.productos = productos;
            console.log(this.id)
          },
          error: (error) => console.error(error),
        });
        switch (Number(this.id)) {
          case 1:
            this.$valorURL = 'Moviles';
            break;
          case 2:
            this.$valorURL = 'Portatiles';
            break;
          case 3:
            this.$valorURL = 'Televisiones';
            break;
          case 4:
            this.$valorURL = 'Tablets';
            break;
          case 5:
            this.$valorURL = 'CPU';
            break;
          case 6:
            this.$valorURL = 'TarjetasGraficas';
            break;
          case 7:
            this.$valorURL = 'PlacasBase';
            break;
          default:
            console.log('Opción no reconocida');
        }
        
        // this.modificarURLFicticia(this.$valorURL)
      } else {
        this.#productosServices.obtenerProductos().subscribe({
          next: (productos) => {
            this.productos = productos;
            this.id = 0
          },
          error: (error) => console.error(error),
        });
      }
    });

    this.#authServices.obtenerMisDatos().subscribe({
      next:(user) => {
        this.usuario = user
        console.log(this.usuario)
      }
    })
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

          setTimeout(function(){
            window.location.reload();
          },1500)
        }
      }
    )
  }
  elementoDetalle(id: number) {
    this.#router.navigate(['/store', id]);
  }
}
