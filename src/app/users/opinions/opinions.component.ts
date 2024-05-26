import { Component, Input, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { leerResenya } from '../../auth/interfaces/users';

@Component({
  selector: 'app-opinions',
  standalone: true,
  imports: [],
  templateUrl: './opinions.component.html',
  styleUrl: './opinions.component.scss'
})
export class OpinionsComponent implements OnInit{

  enVentaActivo: boolean = true;
  vendidoActivo: boolean = false;
  #userService = inject(UserService);
  imagen:boolean = true;
  recibidas:leerResenya[] = [];
  realizadas:leerResenya[] = [];
  @Input() id?: number;
  @Input() text?: string;

  ngOnInit(): void {
      this.#userService.obtenerMisReseñasRecibidas(this.id ?? 'me').subscribe({
        next:(data)=>{
            this.recibidas = data
        }
      })

      this.#userService.obtenerMisReseñasRealizadas(this.id ?? 'me').subscribe({
        next:(data)=>{
            this.realizadas = data
        }
      })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.ensenyarImagen();
    }, 3000);
  }
  
  ensenyarImagen() {
    this.imagen = false;
  }
  
  activarEnVenta() {
    this.enVentaActivo = true;
    this.vendidoActivo = false;
  }

  activarVendido() {
    this.enVentaActivo = false;
    this.vendidoActivo = true;
  }
}
