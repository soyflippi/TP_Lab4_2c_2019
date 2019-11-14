import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {
  mesasLive: any[];
  rol: any;
  pedidosPcuenta: any[];
  estado: number;
  mesa: number;

  constructor(public adminServ: AdminService, public snackBar: MatSnackBar, public auth: AuthService, public pedidos: PedidosService) { }

  ngOnInit() {
    this.adminServ.mesaslive()
      .then(data => {
        this.mesasLive = data;
      });

    this.rol = this.auth.getRol();
  }

  cambiarCom(estadoMesa: number, nromesa: number) {
    let cualmesa = { nro_mesa: nromesa, estado: estadoMesa + 1 };
    this.adminServ.cambiarComiendo(cualmesa);
    this.reload();
  }

  cambiarPag(estadoMesa: number, nromesa: number) {
    let cualmesa = { nro_mesa: nromesa, estado: estadoMesa + 1 };
    this.adminServ.cambiarPagando(cualmesa);
    this.reload();
  }

  cambiarClose(estadoMesa: number, nromesa: number) {
    let cualmesa = { nro_mesa: nromesa, estado: estadoMesa + 1 };
    this.adminServ.cambiarCerrada(cualmesa);
    this.reload();
  }

  reload() {
    this.adminServ.mesaslive()
      .then(data => {
        this.mesasLive = data;
      });
  }

  traerDatosPCuenta(mesa: number, estado: number) {
    this.mesa = mesa;
    this.estado = estado;
    this.pedidos.pedidosParaCuenta(mesa)
      .then(data => { this.pedidosPcuenta = data; console.log(data); })
      .catch(error => { console.log(error); });
  }

  cerrarMesaParaStats(ide: string) {
    let aidi = { id: ide };
    this.pedidos.removerPedidoLive(aidi)
      .then(data => { console.log(data); })
      .catch(error => console.log(error));

    let mesaCerrada = {
      mesa: this.pedidosPcuenta[0].nro_mesa,
      mozo: this.pedidosPcuenta[0].mozo,
      total: this.pedidosPcuenta[0].total
    };
    this.pedidos.nuevaMesaCerrada(mesaCerrada)
      .then(data => { console.log(data); })
      .catch(error => { console.log(error); });

    this.cambiarClose(this.estado, this.mesa);
  }

}
