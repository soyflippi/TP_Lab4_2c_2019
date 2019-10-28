import { Injectable } from '@angular/core';
import { HttpserviceService } from './httpservice.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from '../componentes/admin/emp-list/emp-list.component';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url: string = 'https://appcomanda.000webhostapp.com/Api/Rest';

  constructor(public http: HttpserviceService) { }

  AltaEmpleados(usuario): any {

    return this.http.postHttp(this.url + '/Administrador/AltaEmpleados', usuario);
  }

  public traerEmpleados<T>(): Observable<T> {
    return this.http.GetObservable<T>(this.url + '/Administrador/TraerEmpleados');
  }

  public traerLogins<T>(): Observable<T> {
    return this.http.GetObservable<T>(this.url + '/Empleados/TraerLogins');
  }

  public SuspenderEmp(objeto): any {
    return this.http.postHttp(this.url + '/Administrador/SuspEmpleado', objeto);
  }

  public ReincorporarEmp(objeto): any {
    return this.http.postHttp(this.url + '/Administrador/ReincEmpleado', objeto);
  }

  public BajaLogica(objeto): any {
    return this.http.postHttp(this.url + '/Administrador/EliminarEmpleado', objeto);
  }

  public cambiarComiendo(objeto): any {
    return this.http.postHttp(this.url + '/Mesas/mesaComiendo', objeto);
  }

  public cambiarPagando(objeto): any {
    return this.http.postHttp(this.url + '/Mesas/mesaPagando', objeto);
  }

  public cambiarCerrada(objeto): any {
    return this.http.postHttp(this.url + '/Mesas/mesaCerrada', objeto);
  }

  public mesaslive(): any {
    return this.http.getHttp(this.url + '/Mesas/TraerMesasLive');
  }

  public statsplatos(): any {
    return this.http.getHttp(this.url + '/Pedidos/StatsPlatos');
  }

  public statsmesas(): any {
    return this.http.getHttp(this.url + '/Mesas/StatsMesas');
  }

  public totalMesas(): any {
    return this.http.getHttp(this.url + '/Mesas/TotalFacturadoXmesa');
  }

  public totalPorSector(): any {
    return this.http.getHttp(this.url + '/Empleados/TotalXsector');
  }

  public StatsEmployee(): any {
    return this.http.getHttp(this.url + '/Empleados/OperacionesXempleado');
  }
  public FacturasMaxYmin(): any {
    return this.http.getHttp(this.url + '/Mesas/Max&MinFacturas');
  }

  public totalMensual(): any {
    return this.http.getHttp(this.url + '/Mesas/TotalMensual');
  }
  public BuenosComentarios(): any {
    return this.http.getHttp(this.url + '/Encuesta/TraerBuenosComentarios');
  }

  public MalosComentarios(): any {
    return this.http.getHttp(this.url + '/Encuesta/TraerMalosComentarios');
  }
}
