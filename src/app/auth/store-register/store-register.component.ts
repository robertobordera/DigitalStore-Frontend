import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AbstractControl, FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  #fb = inject(NonNullableFormBuilder);

  enviar = false
  enviarValorAlPadre() {
    this.enviarBooleano.emit(this.enviar)
  }

  cambiarEnviar(){
    this.enviar = true;
    this.enviarValorAlPadre();
  }

  email = this.#fb.control('',[
    Validators.required,
    Validators.email
  ]);

  usuario = this.#fb.control('',[
    Validators.required
  ]);

  password1 = this.#fb.control('',[
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

  codigoP = this.#fb.control('',[
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
    email:this.email,
    usuario:this.usuario,
    password1:this.password1,
    password2:this.password2,
    calle:this.calle,
    numeroCalle:this.numeroCalle,
    codigoP:this.codigoP,
    provincia:this.provincia
},{validators: this.ValidarPassword()});

  usuarioRegistro(){

  }

  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid,
    };
  }

  ValidarPassword():ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const password1 = control.get('password1')?.value;
      const password2 = control.get('password2')?.value;
      if (password1 != password2) {
        return { coinciden: true };
      }
      return null;      
    };
  }
}
