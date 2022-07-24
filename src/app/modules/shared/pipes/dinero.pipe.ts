import { Pipe, PipeTransform } from '@angular/core';
// @ts-ignore
import coinify from 'coinify';
//import * as Dinero from 'dinero.js'

@Pipe({
  name: 'dinero',
})
export class DineroPipe implements PipeTransform {
  transform(value: any /*Dinero.Dinero*/ | null, args?: any): String {
    if (value == null) return '';
    return value.toUnit() + coinify.symbol(value.getCurrency());
  }
}
