import { Component, Input, OnInit, inject } from '@angular/core';
import { MyProductsComponent } from '../my-products/my-products.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { SettingsComponent } from '../settings/settings.component';
import { OpinionsComponent } from '../opinions/opinions.component';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service.service';
import { Users } from '../../auth/interfaces/users';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MyProductsComponent,FavoritesComponent,SettingsComponent,OpinionsComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{
  #userService = inject(UserService);
  #router = inject(Router);
  user?:Users;

  @Input() id?: number;
  
  ngOnInit(): void {
    if(!this.id){
      this.#userService.obtenerMisDatos().subscribe({
        next: (user) => {
          this.user = user; // Asigna el usuario obtenido al atributo de clase user
        }
      });    
    }else{
      this.#userService.obtenerDatosUsuario(this.id ?? 0).subscribe({
        next: (user) => {
          this.user = user; // Asigna el usuario obtenido al atributo de clase user
        }
      });    
    }
  }
  elementoDetalle() {
    this.#router.navigate(['/marketPlace/products/form']);
  }

}
