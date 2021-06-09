import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appEstados]'
})
export class EstadosDirective implements OnInit {
  @Input() estado : string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(){
    if(this.estado == 'Cancelado'){
      this.elementRef.nativeElement.style.backgroundColor = '#F8736A';
    }
    else if(this.estado == 'Realizado'){
      this.elementRef.nativeElement.style.backgroundColor = '#7098F3';
    }
    else if(this.estado == 'Pendiente'){
      this.elementRef.nativeElement.style.backgroundColor = '#F3ED70';
    }
    else if(this.estado == 'Aceptado'){
      this.elementRef.nativeElement.style.backgroundColor = '#70F37E';
    }
    else if(this.estado == 'Rechazado'){
      this.elementRef.nativeElement.style.backgroundColor = '#616161';
    }

  }

}
