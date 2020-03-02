import { Pipe, PipeTransform } from '@angular/core';
import coinify from 'coinify';

@Pipe({
  name: 'dinero'
})
export class DineroPipe implements PipeTransform {

  transform(value: Dinero, args?: any): String {
    var unit = value.toUnit();
    var result = "";
    if(unit<0){
      result=result+"-";
    }
    result = result + unit + coinify.symbol(value.getCurrency());
    return result;
  }
}