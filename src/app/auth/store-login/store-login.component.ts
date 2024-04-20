import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreRegisterComponent } from '../store-register/store-register.component';
import { AbstractControl, FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-store-login',
  standalone: true,
  imports: [StoreRegisterComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './store-login.component.html',
  styleUrl: './store-login.component.scss'
})
export class StoreLoginComponent implements OnInit{

  registro = false;
  login = true;
  booleanoRecibido: boolean = false;
  #router=inject(Router);
  #fb = inject(NonNullableFormBuilder);

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

  email = this.#fb.control('',[
    Validators.required,
    Validators.email
  ]);

  password = this.#fb.control('',[
    Validators.required,
    Validators.minLength(4),
  ]);

  loginForm = this.#fb.group(
    {
      email: this.email,
      password: this.password,
    },
    { validators: this.loginRequired() }
  );

  usuarioRegistro(){

  }

  ensenarRegistro(){
    this.registro = true;
    this.login = false;
  }

  loginRequired(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.get('email')?.value;
      const password = control.get('password')?.value;

      if (!email && !password) {
        return { required: true };
      } else {
        return null;
      }
    };
  }
}
