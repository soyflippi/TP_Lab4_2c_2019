import { Injectable } from '@angular/core';
import { HttpserviceService } from './httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class MozoService {

  url: string = 'https://appcomanda.000webhostapp.com/Api/Rest';

  constructor(public http: HttpserviceService) { }

  NuevosPedidos(pedido) {
    return this.http.postHttp(this.url + '/Pedidos/NuevoPedido', pedido);
  }

  guardarPedVendido(pedidos) {
    return this.http.postHttp(this.url + '/Pedidos/sumarvendidos', pedidos);
  }

  TraerMesasLive() {
    return this.http.getHttp(this.url + '/Mesas/TraerMesas');
  }

  TraerMesasDisponibles() {
    return this.http.getHttp(this.url + '/Mesas/TraerMesasDisponibles');
  }
}
