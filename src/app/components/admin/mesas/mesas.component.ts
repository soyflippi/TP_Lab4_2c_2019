import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/servicios/admin.service';
import {MatSnackBar} from '@angular/material';
import { AuthService } from 'src/app/servicios/auth.service';
import { PedidosService } from 'src/app/servicios/pedidos.service';

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
    .then( data => {
      this.mesasLive = data;
    });

    this.rol = this.auth.getRol();
  }

  cambiarCom(estadoMesa: number, nromesa: number)
  {
    let cualmesa = {nro_mesa: nromesa, estado: estadoMesa + 1 };
    this.adminServ.cambiarComiendo(cualmesa);
    this.openSnackBar('Se cambio el estado a Comiendo. Recargue la lista', 'OK');
  }

  cambiarPag(estadoMesa: number,nromesa: number)
  {
    let cualmesa = {nro_mesa: nromesa, estado: estadoMesa + 1 };
    this.adminServ.cambiarPagando(cualmesa);
    this.openSnackBar('Se cambio el estado a Pagando. Recargue la lista', 'OK');
  }

  cambiarClose(estadoMesa: number,nromesa: number)
  {
    let cualmesa = {nro_mesa: nromesa, estado: estadoMesa + 1 };
    this.adminServ.cambiarCerrada(cualmesa);
    this.openSnackBar('Se ha cerrado la mesa. Recargue la lista', 'OK');
  }

  reload()
  {
    this.adminServ.mesaslive()
    .then( data => {
      this.mesasLive = data;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  traerDatosPCuenta(mesa: number, estado: number)
  {
    this.mesa = mesa;
    this.estado = estado;
    this.pedidos.pedidosParaCuenta(mesa)
    .then( data => {this.pedidosPcuenta = data; console.log(data); })
    .catch( error => { console.log(error); });
  }

  cerrarMesaParaStats(ide: string)
  {
    let aidi = {id: ide};
    this.pedidos.removerPedidoLive(aidi)
    .then( data => {console.log(data); })
    .catch( error => console.log(error));

    let mesaCerrada = {
      mesa: this.pedidosPcuenta[0].nro_mesa,
      mozo: this.pedidosPcuenta[0].mozo,
      total: this.pedidosPcuenta[0].total
    };
    this.pedidos.nuevaMesaCerrada(mesaCerrada)
    .then( data => {console.log(data); })
    .catch( error => {console.log(error); });

    this.cambiarClose(this.estado, this.mesa);
  }

}
