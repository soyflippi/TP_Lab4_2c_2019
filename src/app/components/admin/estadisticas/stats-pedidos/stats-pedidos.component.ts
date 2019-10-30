import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ExcelService } from 'src/app/services/excel.service';
import { throwError } from 'rxjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-stats-pedidos',
  templateUrl: './stats-pedidos.component.html',
  styleUrls: ['./stats-pedidos.component.css']
})
export class StatsPedidosComponent implements OnInit {
  platosSold: number[] = new Array();
  DataPedidos: any;
  mostrarCharts: boolean;

  public barChartOption = {
    scaleShowerVerticalLines: false,
    responsive: true
  };
  public doughnutChartLabels: string[] = ['Cerveza rubia', 'Cerveza roja', 'Cerveza negra', 'Cerveza IPA',
  'Vino Tinto', 'Vino Blanco', 'Agua', 'Cola', 'Martini', 'Cosmopolitan',
  'Asado p/ 4', 'Asada p/ 6', 'Ravioles Tuco', 'Ravioles salsa mixta', 'Hmaburguesa con papas', 'Ensalada mixta',
  'Flan', 'Postre chocolate', 'Budin de pan', 'Helado', 'Panqueque de Manzana'];
  public doughnutChartData: number[] = Array();
  public doughnutChartType: string = 'doughnut';

  ngOnInit() {
    this.TraerPlatos();

  }

  constructor(public adminServ: AdminService, public excelServ: ExcelService) {
    this.mostrarCharts = false;
  }

  public TraerPlatos()
  {
    this.adminServ.statsplatos()
    .then( data => {
        if (data !== []) {
          console.log(data);
          this.DataPedidos = data;
          data.forEach(element => {
            this.doughnutChartData.push(element['cant_ventas']);
          });
          this.mostrarCharts = true;
        }
        else
        {
          throwError('no hay datos para mostrar');
        }
     })
    .catch( error => {console.log(error); });
  }

  ExportarAExcel(data: any, titulo: string)
  {
    this.excelServ.exportAsExcelFile(data, titulo);
  }

  exportarPdf()
  {
    const doc = new jsPDF();
    doc.autoTable({html: '#my-table'});
    doc.save('table.pdf');
  }

    // events
    public chartClicked(e: any): void {
      console.log(e);
    }
   
    public chartHovered(e: any): void {
      console.log(e);
    }

}
