import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-market-place-product',
  standalone: true,
  imports: [],
  templateUrl: './market-place-product.component.html',
  styleUrl: './market-place-product.component.scss'
})
export class MarketPlaceProductComponent {
  
  #router = inject(Router);
  constructor(private route: ActivatedRoute) {}

  elementoDetalle(id: number) {
    this.#router.navigate(['/marketPlace/products', id]);
  }
}
