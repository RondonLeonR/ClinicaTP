import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-botones-solicitar-turno',
  templateUrl: './botones-solicitar-turno.component.html',
  //styleUrls: ['./botones-solicitar-turno.component.css']
  styleUrls: ['./imagen.scss']
})
export class BotonesSolicitarTurnoComponent implements OnInit {

  @Input() listaMostrarEspecialidades;
  @Output() especialidadSeleccionada: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    //console.log(this.listaMostrarEspecialidades);
  }

  EspecialidadElegida(nombreEsp){
    this.especialidadSeleccionada.emit(nombreEsp);
  }

}
