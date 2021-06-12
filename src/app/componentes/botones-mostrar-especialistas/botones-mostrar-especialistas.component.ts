import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-botones-mostrar-especialistas',
  templateUrl: './botones-mostrar-especialistas.component.html',
  styleUrls: ['./imagen.scss']
})
export class BotonesMostrarEspecialistasComponent implements OnInit {

  //itemPipe: any = "";

  @Input() listaMostrarEspecialistas;
  @Output() especialistaSeleccionado: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    //console.log(this.listaMostrarEspecialidades);
  }

  EspecialistaElegido(esp){
    this.especialistaSeleccionado.emit(esp);
  }
}
