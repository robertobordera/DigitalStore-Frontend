import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarketPlaceServiceService } from '../services/market-place-service.service';
import { marketPlace } from '../interfaces/marketPlace';
import { AuthServiceService } from '../../auth/services/auth-service.service';
import { Users, anyadirFavorito } from '../../auth/interfaces/users';
import { UserService } from '../../users/services/user-service.service';

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
  #userService = inject(UserService)
  marketPlace : marketPlace[] = [];
  usuario!:Users
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.#marketService.obtenerMarketProductos()
      .subscribe({
        next:(marketPlace) =>{
          console.log(marketPlace)
          this.marketPlace = marketPlace
        }
      })

      this.#userService.obtenerMisDatos().subscribe({
        next:(user) => {
          this.usuario = user
          console.log(this.usuario)
        }
      })
  };

  anyadirFavorito(productousu_id:number,usuario_id:number){
    const añadir:anyadirFavorito = {
      productousu_id:productousu_id,
      usuario_id:usuario_id
    }

    this.#userService.AnyadirFavorito(añadir).subscribe(
      (response) =>{
        if(response.success){
        }
      }
    )
  }

  elementoDetalle(id: Number | undefined) {
    this.#router.navigate(['/marketPlace/products', id]);
  }
}
