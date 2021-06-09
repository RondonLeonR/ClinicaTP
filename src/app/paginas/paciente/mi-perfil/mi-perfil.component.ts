import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { FireService } from 'src/app/servicios/fire.service';
import { HistoriaClinicaService } from 'src/app/servicios/historia-clinica.service';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  usuarioIngresado: any;
  historialesEncontrados: any []=[];
  spinner = true;

  constructor(
    private fire: FireService,
    private auth: AuthService,
    private fireHistorial: HistoriaClinicaService
    ) { }

  ngOnInit(): void {
    this.fire.TraerUnoPorCorreo(this.auth.currentUser).valueChanges().subscribe((data) => {
      this.usuarioIngresado = data[0];
     
    });

    this.fireHistorial.BuscarHistoriaCorreo(this.auth.currentUser).valueChanges().subscribe((data)=>{
      this.historialesEncontrados = data;
      console.log(this.historialesEncontrados);
    });

    setTimeout(() => {
      this.spinner = false;
    }, 2000);
  }


  DescargarHistorialPDF(){
    const DATA = document.getElementById('PDFGenerar');
    let doc = new jsPDF();
    const options = {
      background: 'white',
      scale: 3,
    };
    doc.text("Historial Clinico",82,10);

    html2canvas(DATA, options)
    .then((canvas) => {
      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(
        img,
        'PNG',
        bufferX,
        bufferY,
        pdfWidth,
        pdfHeight,
        undefined,
        'FAST'
      );
      return doc;
    })
    .then((docResult) => {
      docResult.save('Historial Clinico.pdf');
    });
  }
}
