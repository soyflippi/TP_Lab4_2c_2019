import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import {MatSnackBar} from '@angular/material';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-buscarpedido',
  templateUrl: './buscarpedido.component.html',
  styleUrls: ['./buscarpedido.component.css']
})
export class BuscarpedidoComponent implements OnInit {
  pedidos: any = [];
  cod_pedido: string;
  mostrarPedido: boolean;
  showError: boolean;
  showFeedback = false;
  cod: number;
  estado: number;
  cantidad: number;
  idPedido: string;

  constructor(public pedidosServ: PedidosService,  public snackBar: MatSnackBar,
    public usuarioServ: UsuariosService, private authSV: AuthService) { 

  }

  ngOnInit() {
    this.showFeedback = false;
    this.showError = false;
    this.mostrarPedido = false;
  }

  buscarPedido()
  {
    this.showError = false;
    this.pedidosServ.traerPedidoXid(this.cod_pedido)
    .then( data => {
      console.log(data);
      if (data.length === 0){
        this.showError = true;
      }
      else{
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
    this.showFeedback = false;
    let pedido = {
      idPedido: this.idPedido,
      cod_plato: this.cod
    };
    this.pedidosServ.cancelarPedido(pedido)
    .then( data => {
      this.showFeedback = true;
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
