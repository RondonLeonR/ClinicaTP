import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResaltarBoton]'
})
export class ResaltarBotonDirective {

  constructor(private element: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.element.nativeElement.style.fontSize = '30px';
  }

  @HostListener('mouseleave') onMouseExit(){
    this.element.nativeElement.style.fontSize = '18px';

  }
}
