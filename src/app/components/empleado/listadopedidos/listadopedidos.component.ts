import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listadopedidos',
  templateUrl: './listadopedidos.component.html',
  styleUrls: ['./listadopedidos.component.css']
})
export class ListadopedidosComponent implements OnInit {
  items: any = [];
  public rol;
  esEmpleado: boolean;
  tiempo: number;

  codPlatoParaEstado: number;
  idPedidoParaEstado: number;

  constructor(private pedidosLive: PedidosService, private miauth: AuthService) {
    this.tiempo = 0;
  }

  ngOnInit() {
    this.rol = this.miauth.getRol();
    this.reload();
    if (this.rol !== 4 && this.rol !== 9 && this.rol !== 10) {
      this.esEmpleado = true;
    }
  }

  salvarParaEnviar(id: any, cod: any) {
    this.idPedidoParaEstado = id;
    this.codPlatoParaEstado = cod;
  }


  ///HACER ALGO CON LO QUE DEVULEVE MOSTRARLE ALGO AL USER VIEJO
  cambiarEstadoPreparacion(id, codprod) {
    let pedido = { idPedido: this.idPedidoParaEstado, cod_plato: this.codPlatoParaEstado, tiempo: this.tiempo };
    this.pedidosLive.statePreparando(pedido);
    this.reload();
    //hacer algo con el return true;
  }
  cambiarEstadoPservir(id, codprod) {
    let pedido = { idPedido: id, cod_plato: codprod, horaentrada: localStorage.getItem('horaentrada') };
    this.pedidosLive.statePservir(pedido);
    this.reload();
  }
  cambiarEstadoComiendo(id, codprod) {
    let pedido = { idPedido: id, cod_plato: codprod, horaentrada: localStorage.getItem('horaentrada') };
    this.pedidosLive.stateComiendo(pedido);
    this.reload();
  }

  public reload() {
    this.pedidosLive.TraerPedidos(this.rol)
      .then(data => {
        console.log(data);
        this.items = data;

      })
      .catch(error => {
        console.log(error);
      });
  }
}
