import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMouseSobreBoton]'
})
export class MouseSobreBotonDirective {

  constructor(private element: ElementRef) {

  }

  @HostListener('mouseenter') onMouseEnter(){
    this.element.nativeElement.style.border = '1px solid #17FF00';
    this.element.nativeElement.style.background = '#50FF8A';
    //this.element.nativeElement.style.fontSize = '200px';
  }

  @HostListener('mouseleave') onMouseExit(){
    this.element.nativeElement.style.border = '1px solid #999999';
    this.element.nativeElement.style.background = '#FFFFFF';
  }

}
