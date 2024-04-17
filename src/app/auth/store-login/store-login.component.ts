import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreRegisterComponent } from '../store-register/store-register.component';
@Component({
  selector: 'app-store-login',
  standalone: true,
  imports: [StoreRegisterComponent],
  templateUrl: './store-login.component.html',
  styleUrl: './store-login.component.scss'
})
export class StoreLoginComponent implements OnInit{

  registro = false;
  login = true;
  booleanoRecibido: boolean = false;

  recibirBooleanoDelHijo(valor: boolean) {
    this.booleanoRecibido = valor;
    this.ensenarLogin();
  }

  ensenarLogin() {
    this.login = this.booleanoRecibido;
    this.registro = !this.booleanoRecibido;
  }
  
  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
  }

  ensenarRegistro(){
    this.registro = true;
    this.login = false;
  }

  
 


}
