import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import {MatSnackBar} from '@angular/material';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-buscarpedido',
  templateUrl: './buscarpedido.component.html',
  styleUrls: ['./buscarpedido.component.css']
})
export class BuscarpedidoComponent implements OnInit {
  pedidos: any = [];
  cod_pedido: string;
  mostrarPedido: boolean;

  cod: number;
  estado: number;
  cantidad: number;
  idPedido: string;

  constructor(public pedidosServ: PedidosService,  public snackBar: MatSnackBar,
    public usuarioServ: UsuariosService, private authSV: AuthService) { 

  }

  ngOnInit() {
    this.mostrarPedido = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  buscarPedido()
  {
    this.pedidosServ.traerPedidoXid(this.cod_pedido)
    .then( data => {
      console.log(data);
      if (data.length === 0){
        this.openSnackBar('No se encontraron pedidos con ese codigo.', 'OK');
      }
      else{
        console.log(data);
        this.pedidos = data;
        this.mostrarPedido = true;
        this.nuevaEncuestaPendiente();
      }
    })
    .catch( error => console.log(error));
  }


  GuardarDataParaEliminar(codP: number, estado: number, cantidad: number, id: string)
  {
    this.cod = codP;
    this.idPedido = id;
  }

  CancelarPedio()
  {
    let pedido = {
      idPedido: this.idPedido,
      cod_plato: this.cod
    };
    this.pedidosServ.cancelarPedido(pedido)
    .then( data => {
      this.openSnackBar('Su pedido ha sido cancelado.', 'OK');
      this.mostrarPedido = false;
      this.buscarPedido();
    })
    .catch( error => {
      console.log(error);
    })
  }

  nuevaEncuestaPendiente()
  {
    let futuraEncuesta = {
      mesa: this.pedidos[0].nro_mesa,
      usuario: this.authSV.getUser()
    };
    this.usuarioServ.agregarEncuestaPendiente(futuraEncuesta)
    .then()
    .catch();
  }



}
