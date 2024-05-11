import { Component, Input, OnInit, WritableSignal, inject, input, signal } from '@angular/core';
import { MarketPlaceServiceService } from '../services/market-place-service.service';
import { CommentInsert, comentarios, marketPlace } from '../interfaces/marketPlace';
import { BmMapDirective } from '../../bingmaps/bm-map.directive';
import { BmMarkerDirective } from '../../bingmaps/bm-marker.directive';
import { BmAutosuggestDirective } from '../../bingmaps/bm-autosuggest.directive';
import { Coordinates } from '../../bingmaps/coordinates';
import { GeolocationService } from '../../services/geolocation.service';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-market-place-product-detail',
  standalone: true,
  imports: [BmMapDirective, BmMarkerDirective, BmAutosuggestDirective,ReactiveFormsModule],
  templateUrl: './market-place-product-detail.component.html',
  styleUrl: './market-place-product-detail.component.scss',
  
})
export class MarketPlaceProductDetailComponent implements OnInit {
  #marketService = inject(MarketPlaceServiceService);
  #fb = inject(NonNullableFormBuilder);

  marketPlace!: marketPlace;
  coordinates: Coordinates = { latitude: 0, longitude: 0 };
  comentarios:WritableSignal<comentarios[]> =signal([]); 
  // comentarios:comentarios[] = []
  @Input() id!: number;

  toggled: boolean = true;

  toggle() {
    this.toggled = !this.toggled;
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
  
  moveMap(coords: Coordinates) {
    this.coordinates = coords;
  }

}
