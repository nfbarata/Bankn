import { Pipe, PipeTransform } from '@angular/core';
import coinify from 'coinify';
import Dinero from 'dinero.js'

@Pipe({
  name: 'dinero'
})
export class DineroPipe implements PipeTransform {

  transform(value: Dinero.Dinero, args?: any): String {
    return value.toUnit() + coinify.symbol(value.getCurrency());
  }
}