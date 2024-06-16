import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user-service.service';
import {
  UserDireccion,
  UserNombre,
  UserPasswordEdit,
  Users,
  usuarioCorreo,
} from '../../auth/interfaces/users';
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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  #userService = inject(UserService);
  #fb = inject(NonNullableFormBuilder);
  usuarioMe?: Users;

  toggled: boolean = true;

  toggle() {
    this.toggled = !this.toggled;
  }

  ngOnInit(): void {
    this.#userService.obtenerMisDatos().subscribe({
      next: (usuario) => {
        this.usuarioMe = usuario;
        console.log(this.usuarioMe);
      },
    });
  }

  nombre = this.#fb.control('',[
    Validators.required
  ])

  formularioNombre = this.#fb.group(
    {
      nombre:this.nombre 
    }
  )

  usuarioNombre(){
    const usuarioNombre: UserNombre = {
      ...this.formularioNombre.getRawValue(),
    };

    this.#userService.actualizarNombre(usuarioNombre).subscribe(
      (response) => {
        if (response.success) {
          this.formularioNombre.reset();
          Swal.fire({
            title: response.message,
            icon: 'success',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
          });

          setTimeout(function(){
            window.location.reload();
          },1500)
        }
      },
      (error) => {
        // Manejo del error aquí
        console.error('Error en inicio de sesión:', error);
        this.formularioNombre.reset();
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido actualizar el nombre',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      }
    );
  }

  correo_antiguo = this.#fb.control('', [
    Validators.required,
    Validators.email,
  ]);

  correo = this.#fb.control('', [Validators.required, Validators.email]);

  correo_nuevo2 = this.#fb.control('', [Validators.required, Validators.email]);

  formularioCorreo = this.#fb.group(
    {
      correo_antiguo: this.correo_antiguo,
      correo: this.correo,
      correo_nuevo2: this.correo_nuevo2,
    },
    { validators: [this.ValidarCorreoAntiguo(), this.ValidarCorreo()] }
  );

  usuarioCorreo() {
    const usuarioCorreo: usuarioCorreo = {
      ...this.formularioCorreo.getRawValue(),
    };

    this.#userService.actualizarCorreo(usuarioCorreo).subscribe(
      (response) => {
        if (response.success) {
          this.formularioCorreo.reset();
          Swal.fire({
            title: response.message,
            icon: 'success',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
          });
        }
      },
      (error) => {
        // Manejo del error aquí
        console.error('Error en inicio de sesión:', error);
        this.formularioCorreo.reset();
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido actualizar el correo',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      }
    );
  }

  ValidarCorreoAntiguo(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const correo_antiguo = control.get('correo_antiguo')?.value;
      if (this.usuarioMe?.correo != correo_antiguo) {
        return { coincidenAntiguo: true };
      }
      return null;
    };
  }

  ValidarCorreo(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const correo = control.get('correo')?.value;
      const correo_nuevo2 = control.get('correo_nuevo2')?.value;
      if (correo != correo_nuevo2) {
        return { coinciden: true };
      }
      return null;
    };
  }

  antiguo_pass = this.#fb.control('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  password = this.#fb.control('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  nuevo_pass2 = this.#fb.control('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  formularioPassword = this.#fb.group(
    {
      antiguo_pass: this.antiguo_pass,
      password: this.password,
      nuevo_pass2: this.nuevo_pass2,
    },
    { validators: this.ValidarPassword() }
  );

  usuarioPassword() {
    const usuarioPassword: UserPasswordEdit = {
      ...this.formularioPassword.getRawValue(),
    };

    this.#userService.actualizarPassword(usuarioPassword).subscribe(
      (response) => {
        if (response.success) {
          this.formularioPassword.reset();
          Swal.fire({
            title: response.message,
            icon: 'success',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
          });
        }
      },
      (error) => {
        // Manejo del error aquí
        console.error('Error en inicio de sesión:', error);
        this.formularioCorreo.reset();
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido actualizar la contraseña',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      }
    );
  }

  ValidarPassAntiguo(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const antiguo_pass = control.get('antiguo_pass')?.value;
      if (this.usuarioMe?.password != antiguo_pass) {
        return { coincidenAntiguo: true };
      }
      return null;
    };
  }

  ValidarPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const nuevo_pass2 = control.get('nuevo_pass2')?.value;
      if (password != nuevo_pass2) {
        return { coinciden: true };
      }
      return null;
    };
  }

  calle = this.#fb.control('', [Validators.minLength(4)]);

  numeroCalle = this.#fb.control('', []);

  codigoPostal = this.#fb.control('', [Validators.minLength(4)]);

  provincia = this.#fb.control('', []);

  formularioDireccion = this.#fb.group({
    calle: this.calle,
    numeroCalle: this.numeroCalle,
    codigoPostal: this.codigoPostal,
    provincia: this.provincia,
  });

  usuarioDireccion() {
    const usuarioDireccion: UserDireccion = {
      ...this.formularioDireccion.getRawValue(),
    };

    this.#userService.actualizarDireccion(usuarioDireccion).subscribe(
      (response) => {
        if (response.success) {
          this.formularioDireccion.reset();
          Swal.fire({
            title: response.message,
            icon: 'success',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
          });
        }
      },
      (error) => {
        // Manejo del error aquí
        console.error('Error en inicio de sesión:', error);
        this.formularioDireccion.reset();
        Swal.fire({
          title: 'Error',
          text: 'No se ha podido actualizar la direccion',
          icon: 'error',
          confirmButtonText: 'Entendido',
        });
      }
    );
  }
}
