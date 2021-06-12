import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cortarPalabras'
})
export class CortarPalabrasPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.slice(0,5) + '.';
  }

}
