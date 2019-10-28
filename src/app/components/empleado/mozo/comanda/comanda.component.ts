import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {CodprodToNamePipe} from '../../../../pipes/codprod-to-name.pipe';
import { MozoService } from 'src/app/servicios/mozo.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { PrecioProductoPipe } from 'src/app/pipes/precio-producto.pipe';



@Component({
  selector: 'app-comanda',
  templateUrl: './comanda.component.html',
  styleUrls: ['./comanda.component.css']})
export class ComandaComponent implements OnInit {

  total: number;
  mozo: string;
  pedido: string;
  formComanda: FormGroup;
  formBeer: FormGroup;
  formBebidas: FormGroup;
  formPlatos: FormGroup;
  formPostres: FormGroup;
  nombreCtrl: FormControl;
  mesaCtrl: FormControl;
  comensalesCtrl: FormControl;
  mostrarTabla: boolean;
  codCervezaCtrl: FormControl;
  codBebidaCtrl: FormControl;
  codPlatoCtrl: FormControl;
  codPostreCtrl: FormControl;
  cantCervezasCtrl: FormControl;
  cantBebidasCtrl: FormControl;
  cantPlatosCtrl: FormControl;
  cantPostresCtrl: FormControl;
  items: any = [];
  mesasFree: any = [];
  mostrarDivIdPedido: boolean;
  mostrarPrincipal:boolean;
  miCodigoPedido: string;



  constructor(private miContructor: FormBuilder, private router: Router, private mozoServ: MozoService, public miAuth: AuthService) {
    this.mostrarTabla = false;
    this.mostrarDivIdPedido = false;
    this.mostrarPrincipal = true;
    this.total = 0;
  }

  ngOnInit() {
    this.nombreCtrl = new FormControl('', [Validators.pattern('[a-zA-Z ]*'), Validators.required, Validators.minLength(3)]);
    this.mesaCtrl = new FormControl('', [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.required]);
    this.comensalesCtrl = new FormControl('', [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.required, , Validators.min(1)]);
    this.cantCervezasCtrl = new FormControl('', [Validators.required, Validators.min(1)]);
    this.cantPlatosCtrl = new FormControl('', [Validators.required, Validators.min(1)]);
    this.cantBebidasCtrl = new FormControl('', [Validators.required, Validators.min(1)]);
    this.cantPostresCtrl = new FormControl('', [Validators.required, Validators.min(1)]);
    this.codCervezaCtrl = new FormControl('', [Validators.required]);
    this.codBebidaCtrl = new FormControl('', [Validators.required]);
    this.codPlatoCtrl = new FormControl('', [Validators.required]);
    this.codPostreCtrl = new FormControl('', [Validators.required]);


    this.formComanda = this.miContructor.group({
      nombreCliente: this.nombreCtrl,
      mesa: this.mesaCtrl,
      comensales:  this.comensalesCtrl,
    });

    this.formBeer = this.miContructor.group({
      codCerveza: this.codCervezaCtrl,
      cantCervezas: this.cantCervezasCtrl,
    });

    this.formBebidas = this.miContructor.group({
      codBebida: this.codBebidaCtrl,
      cantBebidas: this.cantBebidasCtrl,
    });

    this.formPlatos = this.miContructor.group({
      codPlato: this.codPlatoCtrl,
      cantPlatos: this.cantPlatosCtrl,
    });

    this.formPostres = this.miContructor.group({
      codPostre: this.codPostreCtrl,
      cantPostres: this.cantPostresCtrl,
    });

    this.mostrarTabla = true;

    this.mozoServ.TraerMesasDisponibles()
    .then(data => {this.mesasFree = data; })
    .catch( error => {console.log(error); });
    console.log(this.mesasFree);
  }


  agregarCerveza() {
    let cos = this.formBeer.get('codCerveza').value;
    let cas = this.formBeer.get('cantCervezas').value;
    cos = parseInt(cos);
    cas = parseInt(cas);
    const nuevo = {cod_prod: cos, cantidad: cas, estado: 0};
    this.items.push(nuevo);
    this.total += new PrecioProductoPipe().transform(cos, '') * cas;
    this.formBeer.reset({codCerveza: '', cantCervezas: null });

  }

  agregarBebida() {
    let cob = this.formBebidas.get('codBebida').value;
    let cab = this.formBebidas.get('cantBebidas').value;
    cob = parseInt(cob);
    cab = parseInt(cab);
    const nuevo = {cod_prod: cob, cantidad: cab, estado: 0};
    this.items.push(nuevo);
    this.total += new PrecioProductoPipe().transform(cob, '') * cab;
    this.formBebidas.reset({codBebida: '', cantBebidas: null });
  }

  agregarPlato() {
    let cop = this.formPlatos.get('codPlato').value;
    let cap = this.formPlatos.get('cantPlatos').value;
    cop = parseInt(cop);
    cap = parseInt(cap);

    const nuevo = {cod_prod: cop, cantidad: cap, estado: 2};
    this.items.push(nuevo);
    this.total += new PrecioProductoPipe().transform(cop, '') * cap;
    this.formPlatos.reset({codPlato: '', cantPlatos: null });
  }

  agregarPostre() {
    let cop = this.formPostres.get('codPostre').value;
    let cap = this.formPostres.get('cantPostres').value;
     cop = parseInt(cop);
     cap = parseInt(cap);
    const nuevo = {cod_prod: cop, cantidad: cap, estado: 0};
    this.total += new PrecioProductoPipe().transform(cop, '') * cap;
    this.items.push(nuevo);

    this.formPostres.reset({codPostre: '', cantCervezas: null });
  }

  eliminarXindex(index: any) {
    this.total  -= new PrecioProductoPipe().transform(this.items[index].cod_prod, '') * this.items[index].cantidad  ;
    this.items.splice(index, 1);
  }

  get name() {
    return this.formComanda.get('nombreCliente') as FormControl;
  }

  get mesa() {
    return this.formComanda.get('mesa') as FormControl;
  }

  get comensales() {
    return this.formComanda.get('comensales') as FormControl;
  }

  enviarPedido() {
    const codigito = Math.random().toString(36).replace('0.', '').substr(2, 5);
    this.miCodigoPedido = codigito;
    const comensales = parseInt(this.formComanda.get('comensales').value);
    console.log(comensales);
    const nuevoPedido = {
      mesa: this.formComanda.get('mesa').value,
      mozo: this.miAuth.getUser(),
      comensales: comensales,
      cliente: this.formComanda.get('nombreCliente').value,
      platos: this.items,
      idPedido: codigito,
      total: this.total
    };
    this.mozoServ.guardarPedVendido(nuevoPedido);
    this.mozoServ.NuevosPedidos(nuevoPedido).then(
      data => {
        console.log(data);
        this.mostrarPrincipal = false;
        this.mostrarDivIdPedido = true;
      })
      .catch( error => console.log(error));
  }

  cerrarModal()
  {
    this.mostrarDivIdPedido = false;
    this.mostrarPrincipal = true;
    this.formBeer.reset({codCerveza: '', cantCervezas: null });
    this.formBebidas.reset({codBebida: '', cantBebidas: null });
    this.formPlatos.reset({codPlato: '', cantPlatos: null });
    this.formPostres.reset({codPostre: '', cantCervezas: null });
    this.formComanda.reset({nombreCliente: '', mesa: '', comensales: null});
    this.items = [];
    this.recargarMesas();
  }

  recargarMesas(){
    this.mozoServ.TraerMesasDisponibles()
    .then(data => {this.mesasFree = data; })
    .catch( error => {console.log(error); });
  }


}
