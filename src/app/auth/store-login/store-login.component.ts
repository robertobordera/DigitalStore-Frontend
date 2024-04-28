import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreRegisterComponent } from '../store-register/store-register.component';
import {
  AbstractControl,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserLogin } from '../interfaces/users';
import { AuthServiceService } from '../services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store-login',
  standalone: true,
  imports: [StoreRegisterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './store-login.component.html',
  styleUrl: './store-login.component.scss',
})
export class StoreLoginComponent implements OnInit {
  registro = false;
  login = true;
  booleanoRecibido: boolean = false;

  #authService = inject(AuthServiceService);
  #router = inject(Router);
  #fb = inject(NonNullableFormBuilder);

  recibirBooleanoDelHijo(valor: boolean) {
    this.booleanoRecibido = valor;
    this.ensenarLogin();
  }

  ensenarLogin() {
    this.login = this.booleanoRecibido;
    this.registro = !this.booleanoRecibido;
  }

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {}

  correo = this.#fb.control('', [Validators.required, Validators.email]);

  password = this.#fb.control('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  loginFormulario = this.#fb.group(
    {
      correo: this.correo,
      password: this.password,
    },
    { validators: this.loginRequired() }
  );

  usuarioLogin() {
    const usuarioLogin: UserLogin = {
      ...this.loginFormulario.getRawValue(),
    };
    this.#authService.login(usuarioLogin).subscribe(
      (response) => {
        if (response.success) {
          this.loginFormulario.reset();
          Swal.fire({
            title: response.message,
            icon: 'success',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.#router.navigate(['/store']);
              
              setTimeout(function(){
                window.location.reload();
              },200)
            }
          });
        }
      },
      (error) => {
        // Manejo del error aquí
        console.error('Error en inicio de sesión:', error);
        this.loginFormulario.reset();
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error durante el inicio de sesión',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      }
    );
  }
  

  ensenarRegistro() {
    this.registro = true;
    this.login = false;
  }

  loginRequired(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const correo = control.get('correo')?.value;
      const password = control.get('password')?.value;

      if (!correo && !password) {
        return { required: true };
      } else {
        return null;
      }
    };
  }
}
