import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router,
} from '@angular/router';
import { AuthServiceService } from '../../auth/services/auth-service.service';
import { Observable } from 'rxjs';
import { Users } from '../../auth/interfaces/users';

@Component({
  selector: 'app-store-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './store-menu.component.html',
  styleUrl: './store-menu.component.scss',
})
export class StoreMenuComponent implements OnInit {
  #router = inject(Router);
  #authService = inject(AuthServiceService);
  user? :Users
  mostrarDesplegable: boolean = false;
  // logged = computed(() => this.#authService.logged());

  ngOnInit(): void {
    this.#authService.getUser().subscribe({
      next:(usuario)=>{
        this.user = usuario
      }
    })
  }

  cerrarSesion(){
    this.#authService.logout2().subscribe({
      next:()=>{
        window.location.reload();
      }
    })
  }
  ensenyarSubmenu() {
    this.mostrarDesplegable = !this.mostrarDesplegable;
  }
  indice() {
    this.#router.navigate(['/store']);
  }

  login() {
    this.#router.navigate(['/auth/login']);
  }

  logout() {
    this.#authService.logout();
    this.#router.navigate(['/auth/login']);
  }

  carrito(){
    this.#router.navigate(['/store/shopping-cart',this.user?.id]);
  }
}
