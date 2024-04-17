import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterLink } from '@angular/router';
import { StoreMenuComponent } from './store/store-menu/store-menu.component';
import { StoreFooterComponent } from './store/store-footer/store-footer.component';
import { StoreProductComponent } from './store/store-product/store-product.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,StoreMenuComponent,RouterLink,StoreFooterComponent,StoreProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'digitalStore-Frontend';
}
