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
import { GeolocationService } from '../../services/geolocation.service';

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
  #geolocationService = inject(GeolocationService);

  latitud = 0;
  longitud = 0;

  recibirBooleanoDelHijo(valor: boolean) {
    this.booleanoRecibido = valor;
    this.ensenarLogin();
  }

  ensenarLogin() {
    this.login = this.booleanoRecibido;
    this.registro = !this.booleanoRecibido;
  }

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.obtainGeolocation();
  }

  async obtainGeolocation() {
    const coords = await this.#geolocationService.getLocation();
    this.latitud = coords.latitude;
    this.longitud = coords.longitude;
  }

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
      latitud: this.latitud,
      longitud: this.longitud
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
