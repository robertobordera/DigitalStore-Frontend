import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarketPlaceServiceService } from '../services/market-place-service.service';
import { marketPlace } from '../interfaces/marketPlace';

@Component({
  selector: 'app-market-place-product',
  standalone: true,
  imports: [],
  templateUrl: './market-place-product.component.html',
  styleUrl: './market-place-product.component.scss'
})
export class MarketPlaceProductComponent implements OnInit{
  
  #router = inject(Router);
  #marketService = inject(MarketPlaceServiceService);
  marketPlace : marketPlace[] = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.#marketService.obtenerMarketProductos()
      .subscribe({
        next:(marketPlace) =>{
          console.log(marketPlace)
          this.marketPlace = marketPlace
        }
      })
  };

  elementoDetalle(id: Number | undefined) {
    this.#router.navigate(['/marketPlace/products', id]);
  }
}
