import { Injectable } from '@angular/core';
import { HttpserviceService } from './httpservice.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  url: string = 'https://appcomanda.000webhostapp.com/Api/Rest';
  rol;
  constructor(public http: HttpserviceService) {
  }

  TraerPedidos(rol: any) {
    switch (rol) {
      case 4:
        return this.http.getHttp(this.url + '/Pedidos/TraerPedidos');

      case 10:
        return this.http.getHttp(this.url + '/Pedidos/TraerPedidos');

      case 5:
        return this.http.getHttp(this.url + '/Pedidos/TraerPedidosCerveza');

      case 6:
        return this.http.getHttp(this.url + '/Pedidos/TraerPedidosBartender');

      case 7:
        return this.http.getHttp(this.url + '/Pedidos/TraerPedidosCocina');

      case 8:
        return this.http.getHttp(this.url + '/Pedidos/TraerPedidosPostre');

    }

  }

  statePreparando(id) {
    return this.http.postHttp(this.url + '/Pedidos/Preparando', id);
  }

  statePservir(id) {
    return this.http.postHttp(this.url + '/Pedidos/ListoParaServir', id);
  }

  stateComiendo(id) {
    return this.http.postHttp(this.url + '/Pedidos/ClientesComiendo', id);
  }

  traerPedidoXid(id) {
    return this.http.getHttp(this.url + '/Pedidos/TraerPedidoXid/' + id);
  }

  pedidosParaCuenta(mesa) {
    return this.http.getHttp(this.url + '/Pedidos/PedidosParaCuenta/' + mesa);
  }

  removerPedidoLive(id) {
    return this.http.postHttp(this.url + '/Pedidos/removerPedido', id);
  }

  nuevaMesaCerrada(mesa) {
    return this.http.postHttp(this.url + '/Mesas/nuevostatsMesaCerrada', mesa);
  }

  cancelarPedido(pedido) {
    return this.http.postHttp(this.url + '/Pedidos/CancelarPedido', pedido);
  }
}
