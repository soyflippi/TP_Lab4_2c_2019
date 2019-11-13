import { Component, OnInit, Injectable, Inject } from '@angular/core';
import * as jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(
    @Inject('Window') private window: Window,
  ) { }

  public exportAsPDF(idHtml, title) {
    var doc = new jsPDF();
    doc.autoTable({ html: idHtml });
    // Save the PDF
    doc.save(title + '.pdf');
  }
}
