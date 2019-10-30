import { Component, OnInit, OnChanges } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Usuario} from '../../classes/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  rol: number;
  token: string;
  usuario = new Usuario();
  helper = new JwtHelperService();
  isLoged: boolean;

  constructor(public router: Router, public RutaActivada: ActivatedRoute, public auth: AuthService, public userServ: UsuariosService) {
    this.isLoged = false;
  }

  ngOnInit() {
    this.token = this.auth.getToken();

    if (this.token !== null) {
      this.rol = this.auth.getRol();
      this.isLoged = true;
      switch (this.auth.getRol()) {
        case 4:
        this.router.navigate(['/Empleado/Mozo/NuevaComanda']);
          break;
        case 9:
          this.router.navigate(['/Cliente/BuscarPedido']);
          break;
        case 10:
          this.router.navigate(['/Admin/Pedidos']);
          break;
        default:
        this.router.navigate(['/Empleado/PedidosLive']);
        break;
      }
    }
  }

  Salir() {
    let hEntrada = localStorage.getItem('horaentrada');
    let emp = {cod_emp: this.auth.getUser(), horaentrada: hEntrada};
    this.userServ.CerrarSeguimiento(emp);
    localStorage.removeItem('token');
    localStorage.removeItem('horaentrada');
    this.router.navigate(['']);
    this.rol = 25;
    this.isLoged = false;
  }

}
