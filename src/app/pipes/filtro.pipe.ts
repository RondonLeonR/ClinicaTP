import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {
  

  transform(value: any, args: any):any {
    const resultado = [];
    for(const item of value){
      if(item.nombreDia.toLowerCase().indexOf(args.toLowerCase()) >-1){
        resultado.push(item);
      }
    }
    return resultado;
  }

}
