import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MarketPlaceServiceService } from '../services/market-place-service.service';
import { subirProducto } from '../interfaces/marketPlace';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-market-place-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './market-place-form.component.html',
  styleUrl: './market-place-form.component.scss'
})
export class MarketPlaceFormComponent {

  #fb = inject(NonNullableFormBuilder);
  #marketPlace = inject(MarketPlaceServiceService)
  #router = inject(Router);
  selectedFile!: File

  titulo = this.#fb.control('',[
    Validators.required,
   Validators.maxLength(20)
  ]);

  descripcion = this.#fb.control('',[
    Validators.required,
    Validators.maxLength(50)
  ]);

  precio = this.#fb.control('',[
    Validators.required,
  ]);

  imagen = this.#fb.control('',[
    Validators.required,
  ]);



  formularioSubir = this.#fb.group({
    titulo:this.titulo,
    descripcion:this.descripcion,
    precio:this.precio,
    imagen:this.imagen
   
  })

  obtenerValorSelect(valorSeleccionado: string) {
    console.log('Valor seleccionado:', valorSeleccionado);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  subirProducto(){
  
    console.log(this.selectedFile);

    const formData = new FormData();
    formData.append('titulo', this.formularioSubir.get('titulo')!.value);
    formData.append('descripcion', this.formularioSubir.get('descripcion')!.value);
    formData.append('precio', this.formularioSubir.get('precio')!.value);
    formData.append('imagen', this.selectedFile);

    this.#marketPlace.subirProducto(formData).subscribe({
      next:(response)=>{
        this.formularioSubir.reset();
        Swal.fire({
          title: response.message,
          icon: 'success',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.#router.navigate(['/marketPlace/products']);
            
            setTimeout(function(){
              window.location.reload();
            },200)
          }
        });
      }
    })
  }
}
