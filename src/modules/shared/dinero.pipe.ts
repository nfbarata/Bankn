import { Pipe, PipeTransform } from '@angular/core';
import coinify from 'coinify';

@Pipe({
  name: 'dinero'
})
export class DineroPipe implements PipeTransform {

  transform(value: Dinero, args?: any): String {
    return value.toUnit();// + " " + coinify.symbol(value.currency);
  }

}