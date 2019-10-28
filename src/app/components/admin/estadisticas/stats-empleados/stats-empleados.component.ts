import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { AdminService } from 'src/app/servicios/admin.service';
import { Observable } from 'rxjs';
import { ExcelService } from 'src/app/servicios/excel.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export interface UserData {
  cod_emp: number;
  nombre: string;
  apellido: string;
  usuario: string;
  entrada: string;
  salida: string;
  rol: string;
  operaciones: number;
}

@Component({
  selector: 'app-stats-empleados',
  templateUrl: './stats-empleados.component.html',
  styleUrls: ['./stats-empleados.component.css']
})
export class StatsEmpleadosComponent implements OnInit {
  //table
  datosUsuarios: UserData[];
  displayedColumns: string[] = ['codemp', 'nombre', 'apellido', 'usuario', 'rol', 'entrada', 'salida', 'operaciones'];
  dataSource;
  logins: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // PolarArea
  public mostrarPolar = false;
  public DataEmpleados: any;
  public polarAreaChartLabels: string[] = ['Cervecero', 'Bartenders', 'Cocineros', 'Reposteros'];
  public polarAreaChartData: number[] = Array();
  public polarAreaLegend: boolean = true;
  public polarAreaChartType: string = 'polarArea';
   
    // events
    public chartClicked(e:any):void {
      console.log(e);
    }
   
    public chartHovered(e:any):void {
      console.log(e);
    }
  
  constructor(public adminServ: AdminService, public excelServ: ExcelService) { 
    this.dataSource = new MatTableDataSource;

    this.adminServ.traerLogins().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
      this.logins = data;
    });
  }

  ngOnInit() {
    this.totalXsector();
    this.statsEmpleados();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Filtro tabla
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  reload()
  {
    this.adminServ.traerLogins().subscribe(data => {
      console.log(data);
    });
  }

  totalXsector()
  {
    this.polarAreaChartData = [];
    this.adminServ.totalPorSector()
    .then( data => {
      if (data !== []) {console.log(data);
        data.forEach(element => {
          this.polarAreaChartData.push(element['operaciones']);
        });
        console.log(this.polarAreaChartData);
      }
      this.mostrarPolar = true;
   })
  .catch( error => {console.log(error); });
  }

  statsEmpleados()
  {
    this.adminServ.StatsEmployee()
    .then( data => { 
      this.DataEmpleados = data;
    })
  }

  ExportarAExcel(titulo: string)
  {
    this.excelServ.exportAsExcelFile(this.logins, titulo);
  }

  exportarPdf()
  {
    const doc = new jsPDF();
    doc.autoTable({html: '#my-table'});
    doc.save('loginempleados.pdf');
  }


}
