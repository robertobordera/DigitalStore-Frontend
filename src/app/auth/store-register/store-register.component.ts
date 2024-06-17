import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { Users } from '../interfaces/users';
import Swal from 'sweetalert2';
import { GeolocationService } from '../../services/geolocation.service';



@Component({
  selector: 'app-store-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './store-register.component.html',
  styleUrl: './store-register.component.scss'
})
export class StoreRegisterComponent implements OnInit{
  @Output() enviarBooleano = new EventEmitter<boolean>();
  #router=inject(Router);
  #authService = inject(AuthServiceService);
  #fb = inject(NonNullableFormBuilder);
  #geolocationService = inject(GeolocationService);
  selectedFile!: File
  enviar = false

  latitud = 0;
  longitud = 0;

  ngOnInit(): void {
    this.obtainGeolocation();
  }

  async obtainGeolocation() {
    const coords = await this.#geolocationService.getLocation();
    this.latitud = coords.latitude;
    this.longitud = coords.longitude;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

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
  avatar = this.#fb.control('',[
    Validators.required,
  ]);

  formularioRegistro = this.#fb.group({
    correo:this.correo,
    nombre:this.nombre,
    password:this.password,
    password2:this.password2,
    calle:this.calle,
    numeroCalle:this.numeroCalle,
    codigoPostal:this.codigoPostal,
    provincia:this.provincia,
    avatar:this.avatar
},{validators: this.ValidarPassword()});

  usuarioRegistro(){
    const formData = new FormData();
  
    formData.append('correo', this.formularioRegistro.get('correo')!.value);
    formData.append('nombre', this.formularioRegistro.get('nombre')!.value);
    formData.append('password', this.formularioRegistro.get('password')!.value);
    formData.append('password2', this.formularioRegistro.get('password2')!.value);
    formData.append('calle', this.formularioRegistro.get('calle')!.value);
    formData.append('numeroCalle', this.formularioRegistro.get('numeroCalle')!.value);
    formData.append('codigoPostal', this.formularioRegistro.get('codigoPostal')!.value);
    formData.append('provincia', this.formularioRegistro.get('provincia')!.value);
    
    
    // Agregar el archivo seleccionado si existe
    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile, this.selectedFile.name);
    }

    this.#authService.register(formData).subscribe({
      next:()=>{
        this.formularioRegistro.reset();
        Swal.fire({
          title:"¡Registro Completado!",
          icon:"success",
          confirmButtonText:"Entenido"
        });
      }
    })
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
