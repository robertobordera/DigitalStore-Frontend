import { Component, Input, OnInit, inject } from '@angular/core';
import { marketPlace } from '../../marketPlace/interfaces/marketPlace';
import { UserService } from '../services/user-service.service';
import { Users } from '../../auth/interfaces/users';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit{
  favoritos:marketPlace[] = []
  usuarioMe?:Users
  #userService = inject(UserService);
  @Input() id!: number;

  ngOnInit(): void {
      this.#userService.ObtenerFavorito(this.id).subscribe({
        next:(producto)=>{
          console.log(producto)
          this.favoritos = producto
          console.log(this.favoritos)
        }
      })

      this.#userService.obtenerMisDatos().subscribe({
        next: (usuario) => {
          this.usuarioMe = usuario;
          console.log(this.usuarioMe);
        },
      });
  }

  borrarFavorito(idProductousu:number){
    if(this.usuarioMe?.id != undefined)
      {
        this.#userService.eliminarProductoFavorito(this.usuarioMe.id,idProductousu).subscribe(
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
}
