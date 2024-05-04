import { Component, Input, OnInit, inject, input } from '@angular/core';
import { MarketPlaceServiceService } from '../services/market-place-service.service';
import { marketPlace } from '../interfaces/marketPlace';
import { BmMapDirective } from '../../bingmaps/bm-map.directive';
import { BmMarkerDirective } from '../../bingmaps/bm-marker.directive';
import { BmAutosuggestDirective } from '../../bingmaps/bm-autosuggest.directive';
import { Coordinates } from '../../bingmaps/coordinates';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-market-place-product-detail',
  standalone: true,
  imports: [BmMapDirective, BmMarkerDirective, BmAutosuggestDirective],
  templateUrl: './market-place-product-detail.component.html',
  styleUrl: './market-place-product-detail.component.scss',
  
})
export class MarketPlaceProductDetailComponent implements OnInit {
  #marketService = inject(MarketPlaceServiceService);
  marketPlace!: marketPlace;
  coordinates: Coordinates = { latitude: 0, longitude: 0 };

  @Input() id!: number;

  toggled: boolean = true;

  toggle() {
    this.toggled = !this.toggled;
  }

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
  }
  
  moveMap(coords: Coordinates) {
    this.coordinates = coords;
  }

}
