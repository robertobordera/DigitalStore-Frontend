import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../interfaces/productos';

@Pipe({  name: 'productFilter',  standalone: true,})

export class PostFilterPipe implements PipeTransform {

    transform(products: Producto[], search: string): Producto[] {
      if (!search) return products;
      return products.filter((p) =>
        p.marcaModelo!.toLowerCase().includes(search.toLowerCase())
      );
    }
  }