import { Component } from '@angular/core';
import { MyProductsComponent } from '../my-products/my-products.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { SettingsComponent } from '../settings/settings.component';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MyProductsComponent,FavoritesComponent,SettingsComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

}
