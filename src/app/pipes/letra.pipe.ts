import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'letra'
})
export class LetraPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    //console.log(value);
    return value[0].toUpperCase() + value.slice(1);
  }



}
