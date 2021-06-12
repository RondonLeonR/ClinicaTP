import { Component, OnInit } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { AuthService } from 'src/app/servicios/auth.service';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-barra-turnos-dias',
  templateUrl: './barra-turnos-dias.component.html',
  styleUrls: ['./barra-turnos-dias.component.css']
})
export class BarraTurnosDiasComponent implements OnInit {
  
  //mostrarGrafico = false;
  spinner = true;

  listadoTurnos: any[] = [];

  cantidadTurnosLunes = 0;
  cantidadTurnosMartes = 0;
  cantidadTurnosMiercoles = 0;
  cantidadTurnosJueves = 0;
  cantidadTurnosViernes = 0;
  cantidadTurnosSabado = 0;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];


  //Valores
  public barChartData: ChartDataSets[] = [
    { data: [this.cantidadTurnosLunes, this.cantidadTurnosMartes, this.cantidadTurnosMiercoles, this.cantidadTurnosJueves, this.cantidadTurnosViernes, this.cantidadTurnosSabado], label: 'Turnos' }
  ];

  constructor(
    private fireTurno: TurnosService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.fireTurno.TraerTodosLosTurnos().valueChanges().subscribe((data) => {
      data.forEach(element => {
        if (element.especialista == this.auth.currentUser) {
          this.listadoTurnos.push(element);
          this.SumarCantidadTurnosPorDia(element);
        }
      });
    });

    setTimeout(() => {
      this.spinner = false;
    }, 3000);

  }

  SumarCantidadTurnosPorDia(turno: any) {
    let diaTurno = turno.fecha.slice(0, 5);
    if (diaTurno == "Lunes") {
      this.cantidadTurnosLunes++;
      this.barChartData[0].data[0] = this.cantidadTurnosLunes;
    }
    else if (diaTurno == "Marte") {
      this.cantidadTurnosMartes++;
      this.barChartData[0].data[1] = this.cantidadTurnosMartes;
    }
    else if (diaTurno == "Mierc") {
      this.cantidadTurnosMiercoles++;
      this.barChartData[0].data[2] = this.cantidadTurnosMiercoles;
    }
    else if (diaTurno == "Jueve") {
      this.cantidadTurnosJueves++;
      this.barChartData[0].data[3] = this.cantidadTurnosJueves;
    }
    else if (diaTurno == "Viern") {
      this.cantidadTurnosViernes++;
      this.barChartData[0].data[4] = this.cantidadTurnosViernes;
    }
    else if (diaTurno == "Sabad") {
      this.cantidadTurnosSabado++;
      this.barChartData[0].data[5] = this.cantidadTurnosSabado;
    }

  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
