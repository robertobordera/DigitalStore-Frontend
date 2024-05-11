import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from '../interfaces/productos';
import { StoreServiceService } from '../services/store-service.service';
import Swal from 'sweetalert2';
import { UserService } from '../../users/services/user-service.service';
import { Users } from '../../auth/interfaces/users';

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
  usuarioMe?:Users
  #productosServices = inject(StoreServiceService)
  #userService = inject(UserService);
  total: number = 0.00;
  imagen:boolean = true;
  @Input() id!: number;
  
  ngOnInit(): void {
    this.#productosServices.ObtenerCarrito(this.id).subscribe({
      next:(producto)=>{
        this.carritos = producto
        console.log(this.carritos)
        this.sumarPrecio()
      }
    });

    this.#userService.obtenerMisDatos().subscribe({
      next: (usuario) => {
        this.usuarioMe = usuario;
        console.log(this.usuarioMe);
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

  sumarPrecio():void{
    this.total = this.carritos.reduce((acc, carrito) => acc + Number(carrito.precio), 0);
    this.total = Math.round(this.total * 100) / 100;
  }

  borrarProducto(idProducto:number){
    if(this.usuarioMe?.id != undefined)
      {
        this.#productosServices.eliminarProductoCarrito(this.usuarioMe.id,idProducto).subscribe(
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
    }

    vaciarCarrito(){
      if(this.usuarioMe?.id)
      this.#productosServices.vaciarCarrito(this.usuarioMe?.id).subscribe(
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
}
