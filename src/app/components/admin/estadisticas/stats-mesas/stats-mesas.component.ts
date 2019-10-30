import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ExcelService } from 'src/app/services/excel.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-stats-mesas',
  templateUrl: './stats-mesas.component.html',
  styleUrls: ['./stats-mesas.component.css']
})
export class StatsMesasComponent implements OnInit {
  dataFacturasTable: any;
  
  public mostrarChartPie = false;
  public mostrarChart = false;
  public mostrarChartTiempo = false;
   // lineChart
   dataUltimosMeses;
   public lineChartData: any[] =  Array();
  public lineChartLabels: Array<any> = ['Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  // Pie
  public pieChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public pieChartData: number[] = Array();
  public pieChartType: string = 'pie';
  //Bar
  dataBC;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = Array();


  usosMesas: any;
  facturasMesas: any;
  // events
  
  constructor(public adminServ: AdminService, public excelServ: ExcelService) {
    this.dataBC = {data: [], label: 'Usos'};
    this.dataUltimosMeses = {data: [], label: 'Total Facturado'};
    this.traerUsos();
    this.mesasTotal();
    this.facturasMaxYMin();
    this.totalUltimosMeses();
  }

  ngOnInit() { 
  }

  public chartClicked(e: any): void {
    console.log(e);
  }
 
  public chartHovered(e: any): void {
    console.log(e);
  }

  traerUsos(){
    
    this.adminServ.statsmesas()
    .then( data => {
        if (data !== []) {console.log(data);
          this.usosMesas = data;
          data.forEach(element => {
            this.dataBC['data'].push(element['cant_usos']);
          });
        }
        this.barChartData.push(this.dataBC);
        this.mostrarChart = true;
     })
    .catch( error => {console.log(error); });
  }

  totalUltimosMeses()
  {
    this.adminServ.totalMensual()
    .then( data => {
      console.log(data + 'lalal ');
      if (data !== []) {console.log(data);
        data.forEach(element => {
          this.dataUltimosMeses['data'].push(element['septiembre']);
        });
      }
      this.lineChartData.push(this.dataUltimosMeses);
      this.mostrarChartTiempo = true;
    })
  }

  mesasTotal()
  {
    this.pieChartData = [];
    this.adminServ.totalMesas()
    .then( data => {
      this.facturasMesas = data;
      if (data !== []) {console.log(data);
        data.forEach(element => {
          this.pieChartData.push(element['totalFacturado']);
        });
        console.log(this.pieChartData);
      }
      this.mostrarChartPie = true;
   })
  .catch( error => {console.log(error); });
  }

  facturasMaxYMin()
  {
    this.adminServ.FacturasMaxYmin()
    .then(
        data => {
          console.log(data);
          this.dataFacturasTable = data;
        }
    )
  }

  ExportarAExcel(data: any, titulo: string)
  {
    this.excelServ.exportAsExcelFile(data, titulo);
  }

  exportarPdf()
  {
    const doc = new jsPDF();
    doc.autoTable({html: '#my-table'});
    doc.save('mesas.pdf');
  }

}
