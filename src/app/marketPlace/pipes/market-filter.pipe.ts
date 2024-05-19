import { Pipe, PipeTransform } from '@angular/core';
import { marketPlace } from '../interfaces/marketPlace';

@Pipe({  name: 'marketFilter',  standalone: true,})

export class MarketFilterPipe implements PipeTransform {

    transform(products: marketPlace[], search: string): marketPlace[] {
      if (!search) return products;
      return products.filter((p) =>
        p.titulo!.toLowerCase().includes(search.toLowerCase())
      );
    }
  }