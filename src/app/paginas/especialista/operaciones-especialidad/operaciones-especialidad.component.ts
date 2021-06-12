import { Component, OnInit } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { AuthService } from 'src/app/servicios/auth.service';
import { FireService } from 'src/app/servicios/fire.service';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-operaciones-especialidad',
  templateUrl: './operaciones-especialidad.component.html',
  styleUrls: ['./operaciones-especialidad.component.css']
})
export class OperacionesEspecialidadComponent implements OnInit {

  auxUsuarioIngresado: any;

  spinner = true;

  listadoTurnos: any[] = [];

  auxEspUno = 0;


  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [0, 0, 0, 0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', , 'rgba(0,0,150,0.3)'],
    },
  ];

  constructor(
    private fire: FireService,
    private fireTurno: TurnosService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.fire.TraerUnoPorCorreo(this.auth.currentUser).valueChanges().subscribe((user) => {
      this.auxUsuarioIngresado = user[0];
      this.pieChartLabels = [];
      this.CargarEspecialidades();
    });


    this.fireTurno.TraerTodosLosTurnos().valueChanges().subscribe((data) => {
      data.forEach(element => {
        if (element.especialista == this.auth.currentUser) {
          this.listadoTurnos.push(element);
          this.SumarAccionesEspecialidad(element);
        }
      });
    });



    setTimeout(() => {
      this.spinner = false;
    }, 3000);

  }

  CargarEspecialidades() {
    this.auxUsuarioIngresado.especialidad.forEach(element => {
      this.pieChartLabels.push(element.nombre);
    });
  }

  SumarAccionesEspecialidad(turno: any) {
    //Cargar Datos vacios
    for (let i = 0; i < this.pieChartLabels.length; i++) {
      //console.log(this.pieChartLabels[i]);
      if (this.pieChartLabels[i] == turno.especialidad) {
        if (turno.estado != 'Pendiente') {
          this.pieChartData[i]++;
        }
      }
    }
    //console.log(this.pieChartData);
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
