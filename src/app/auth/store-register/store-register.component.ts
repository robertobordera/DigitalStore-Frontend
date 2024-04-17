import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-store-register',
  standalone: true,
  imports: [],
  templateUrl: './store-register.component.html',
  styleUrl: './store-register.component.scss'
})
export class StoreRegisterComponent {
  @Output() enviarBooleano = new EventEmitter<boolean>();

  enviar = false
  enviarValorAlPadre() {
    this.enviarBooleano.emit(this.enviar)
  }

  cambiarEnviar(){
    this.enviar = true;
    this.enviarValorAlPadre();
  }
}
