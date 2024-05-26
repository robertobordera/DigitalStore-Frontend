import { Component, OnInit, inject } from '@angular/core';
import { MarketPlaceServiceService } from '../../marketPlace/services/market-place-service.service';
import { productoVendedor, subirResenya } from '../../marketPlace/interfaces/marketPlace';
import { ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resenya',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './resenya.component.html',
  styleUrl: './resenya.component.scss'
})
export class ResenyaComponent implements OnInit{
  #marketService = inject(MarketPlaceServiceService)
  #fb = inject(NonNullableFormBuilder);
  #router = inject(Router);
  
  productoVendedor?:productoVendedor
  producto_id!:number
  enviador_id!:number
  receptor_id!:number

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.queryParams.subscribe((params) =>{
        if(params['id_producto']){
          this.producto_id = params['id_producto']
        }
        if(params['id_enviador']){
          this.enviador_id = params['id_enviador']
        }
        if(params['id_receptor']){
          this.receptor_id = params['id_receptor']
        }
        
        console.log(this.producto_id);
        this.#marketService.obtenerDatosReseña(this.producto_id).subscribe({
          next:(data)=>{
            this.productoVendedor = data
            console.log(this.productoVendedor)
          }
        })
      })
  }

  reseña = this.#fb.control('',[
    Validators.required,
    Validators.maxLength(50)
  ]);

  puntuacion = this.#fb.control('',[
    Validators.required,
  ]);

  
  formularioResenya = this.#fb.group({
    reseña:this.reseña,
    puntuacion:this.puntuacion,
  })

  subirResenya(){
    const resenyaSubir : subirResenya = {
      ...this.formularioResenya.getRawValue(),
      puntuacion: parseFloat(this.formularioResenya.get('puntuacion')!.value),
      usuario_enviador_id:this.enviador_id,
      usuario_receptor_id:this.receptor_id,
      productousu_id:this.producto_id
    }

    this.#marketService.subirResenya(resenyaSubir).subscribe({
      next:(response)=>{
        this.formularioResenya.reset();
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
