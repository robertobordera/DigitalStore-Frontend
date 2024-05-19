import { Component, Input, OnInit, WritableSignal, inject, input, signal } from '@angular/core';
import { MarketPlaceServiceService } from '../services/market-place-service.service';
import { CommentInsert, comentarios, marketPlace } from '../interfaces/marketPlace';
import { BmMapDirective } from '../../bingmaps/bm-map.directive';
import { BmMarkerDirective } from '../../bingmaps/bm-marker.directive';
import { BmAutosuggestDirective } from '../../bingmaps/bm-autosuggest.directive';
import { Coordinates } from '../../bingmaps/coordinates';
import { GeolocationService } from '../../services/geolocation.service';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../users/services/user-service.service';
import { Users } from '../../auth/interfaces/users';
import Swal from 'sweetalert2';
import { solicitud } from '../../auth/interfaces/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-market-place-product-detail',
  standalone: true,
  imports: [BmMapDirective, BmMarkerDirective, BmAutosuggestDirective,ReactiveFormsModule],
  templateUrl: './market-place-product-detail.component.html',
  styleUrl: './market-place-product-detail.component.scss',
  
})
export class MarketPlaceProductDetailComponent implements OnInit {
  #marketService = inject(MarketPlaceServiceService);
  #userService = inject(UserService);
  #fb = inject(NonNullableFormBuilder);
  #router = inject(Router);

  marketPlace!: marketPlace;
  coordinates: Coordinates = { latitude: 0, longitude: 0 };
  comentarios:WritableSignal<comentarios[]> =signal([]); 
  usuarioMe!:Users
  // comentarios:comentarios[] = []
  @Input() id!: number;

  toggled: boolean = true;
  toggled2:boolean = false;

  toggle() {
    this.toggled = !this.toggled;
  }

  toggle2() {
    this.toggled2 = !this.toggled2;
  }
  
  comentario = this.#fb.control('');

  formComment = this.#fb.group({
    comentario: this.comentario,
  });

  ngOnInit(): void {
    this.#marketService.obtenerMarketProducto(this.id).subscribe({
      next: (resp) => {
        console.log(resp);
        this.marketPlace = resp;
        if (this.marketPlace.usuario) {
          this.coordinates.latitude = Number(this.marketPlace.usuario.latitud);
          this.coordinates.longitude = Number(this.marketPlace.usuario.longitud);
        }
      },
    });

    this.#marketService.obtenerComentarios(this.id).subscribe({
      next:(comentarios)=>{
        console.log(comentarios)
        this.comentarios.set(comentarios)
      }
    })

    this.#userService.obtenerMisDatos().subscribe({
      next: (usuario) => {
        this.usuarioMe = usuario;
        console.log(this.usuarioMe);
      },
    });
  }

  addComment(){
    const comentario:CommentInsert={
       comentario:this.comentario.value,
    }
    console.log(comentario);

    this.#marketService.subirComentario(this.id,comentario).subscribe({
      next: (comment) => {
        console.log(comment)
        this.comentarios().push(comment);
        this.comentario.reset();
      },
      error: (error) => console.error(error),
    });
  }

  mail(){
    this.#router.navigate(['/user/mail']);
  }
  
  realizarVenta(){
    Swal.fire({
      title: "Se le enviara al propietario sus datos de contacto, ¿Estas seguro?",
      icon: 'success',
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false,
    }).then((result) => {

      if (result.isConfirmed) {
        if(this.usuarioMe.id)
        this.#marketService.ventas(this.marketPlace.usuario_id ?? 0,this.id).subscribe({
          next:() =>{
            let solicitud:solicitud = {
              usuario_enviador_id : this.usuarioMe.id ?? 0,
              usuario_receptor_id : this.marketPlace.usuario_id ?? 0,
              productousu_id:this.id
            }

            this.#userService.enviarSolicitud(solicitud).subscribe({
              next:()=>{
                Swal.fire({
                  title: "Solicitud enviada con exito",
                  icon: 'success',
                  confirmButtonText: 'Entendido',
                  confirmButtonColor: '#3085d6',
                  allowOutsideClick: false,
                }).then((result2)=>{
                  if(result2.isConfirmed){
                    this.#router.navigate(['/marketPlace/products']);
                  }
                })
              }
            })
          }
      })
      }

    });
  }
  
  moveMap(coords: Coordinates) {
    this.coordinates = coords;
  }

}
