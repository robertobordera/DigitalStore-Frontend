import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AbstractControl, FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { Users } from '../interfaces/users';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-store-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './store-register.component.html',
  styleUrl: './store-register.component.scss'
})
export class StoreRegisterComponent {
  @Output() enviarBooleano = new EventEmitter<boolean>();
  #router=inject(Router);
  #authService = inject(AuthServiceService);
  #fb = inject(NonNullableFormBuilder);

  enviar = false
  enviarValorAlPadre() {
    this.enviarBooleano.emit(this.enviar)
  }

  cambiarEnviar(){
    this.enviar = true;
    this.enviarValorAlPadre();
  }

  correo = this.#fb.control('',[
    Validators.required,
    Validators.email
  ]);

  nombre = this.#fb.control('',[
    Validators.required
  ]);

  password = this.#fb.control('',[
    Validators.required,
    Validators.minLength(4)
  ]);

  password2 = this.#fb.control('',[
    Validators.required,
    Validators.minLength(4)
  ]);

  calle = this.#fb.control('',[
    Validators.required,
    Validators.minLength(4)
  ]);

  numeroCalle = this.#fb.control('',[
    Validators.required
  ]);

  codigoPostal = this.#fb.control('',[
    Validators.required,
    Validators.minLength(2)
  ]);

  provincia = this.#fb.control('',[
    Validators.required
  ])

  // avatar = this.#fb.control('',[
  //   Validators.required,
  //   Validators.minLength(4)
  // ]);

  formularioRegistro = this.#fb.group({
    correo:this.correo,
    nombre:this.nombre,
    password:this.password,
    password2:this.password2,
    calle:this.calle,
    numeroCalle:this.numeroCalle,
    codigoPostal:this.codigoPostal,
    provincia:this.provincia
},{validators: this.ValidarPassword()});

  usuarioRegistro(){
    // const usuarioRegistro : Users = {
    //   ...this.formularioRegistro.getRawValue(),
    // };

    // this.#authService.register(usuarioRegistro).subscribe({
    //   next:()=>{
    //     this.formularioRegistro.reset();
    //     Swal.fire({
    //       title:"¡Registro Completado!",
    //       icon:"success",
    //       confirmButtonText:"Entenido"
    //     });
    //   }
    // })
  }

  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid,
    };
  }

  ValidarPassword():ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const password2 = control.get('password2')?.value;
      if (password != password2) {
        return { coinciden: true };
      }
      return null;      
    };
  }
}
