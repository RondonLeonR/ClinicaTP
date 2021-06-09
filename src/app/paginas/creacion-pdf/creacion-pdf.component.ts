import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/servicios/fire.service';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';


@Component({
  selector: 'app-creacion-pdf',
  templateUrl: './creacion-pdf.component.html',
  styleUrls: ['./creacion-pdf.component.css']
})
export class CreacionPDFComponent implements OnInit {

  noMostrar = false; ///Lo uso para no mostrar la tabla a crear
  listadoUsuarios: any;

  constructor(
    private fire: FireService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.fire.GetUsuarios().valueChanges().subscribe((users) => {
      this.listadoUsuarios = users;
      //console.log(this.listadoUsuarios);
    });

    setTimeout(() => {
      this.imprimirPdf();
      this.router.navigateByUrl('home');
    }, 6000);
  }


  imprimirPdf(): void {
    const DATA = document.getElementById('PDFGenerar');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 1,
    };
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
        docResult.save('Listado de Usuarios');
      });
  }

}
