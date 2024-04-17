import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-store-menu',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './store-menu.component.html',
  styleUrl: './store-menu.component.scss'
})
export class StoreMenuComponent {
  #router = inject(Router);
  indice(){
    this.#router.navigate(['/store'])
  }
}
