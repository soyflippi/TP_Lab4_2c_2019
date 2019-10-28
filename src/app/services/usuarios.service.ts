import { Injectable } from '@angular/core';
import { HttpserviceService } from './httpservice.service';
@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  url: string = 'https://appcomanda.000webhostapp.com/Api/Rest';

  constructor(public http: HttpserviceService) { }

  InciarSesion(usuario): any {
    return this.http.postHttp(this.url + '/Publico/Logear', usuario);
  }

  AltaUsuarios(usuario): any {
    return this.http.postHttp(this.url + '/Publico/Registro', usuario);
  }

  loginParaSeguimiento(emp): any {
    return this.http.postHttp(this.url + '/Publico/Seguimiento', emp);
  }

  CerrarSeguimiento(emp): any {
    return this.http.postHttp(this.url + '/Publico/CerrarSeguimientoDiario', emp);
  }

  guardarEncuesta(encuesta) {
    return this.http.postHttp(this.url + '/Encuesta/AltaEncuesta', encuesta);
  }

  agregarEncuestaPendiente(userImesa) {
    return this.http.postHttp(this.url + '/Encuesta/EncuestaPendiente', userImesa);
  }

  BuscarEncuestasPendientes(userID) {
    return this.http.getHttp(this.url + '/Encuesta/BuscarEncuestaPendiente/' + userID);
  }
}
