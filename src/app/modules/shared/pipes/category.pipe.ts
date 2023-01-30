import { Pipe, PipeTransform } from '@angular/core';
//import { Category } from 'src/app/models/category';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: string /*| Category*/, args?: any): String {
    /*  if (typeof value === 'string') 
      return value;
    return value.name;*/
    return '';
  }
}
