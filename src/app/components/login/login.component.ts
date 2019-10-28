import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../clases/usuario';
import {UsuariosService} from '../../servicios/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: string;
  pass: string;
  usuario: Usuario;
  isError = false;
  error: String = '';

  helper = new JwtHelperService();

  constructor(public usuarioServ: UsuariosService, public router: Router, public routes: ActivatedRoute, public auth: AuthService ) {
    this.usuario = new Usuario();

   }
   admin() {
      this.user = 'admin';
      this.pass = 'admin';
   }
   cervecero() {
      this.user = 'malte';
      this.pass = '123456';
   }
   mozo() {
    this.user = 'mozo01';
    this.pass = '123456';
  }
   cliente() {
     this.user = 'user';
     this.pass = 'user';
   }

   cocinero() {
    this.user = 'marub';
    this.pass = '123456';
  }

  repostero() {
    this.user = 'tgod';
    this.pass = '123456';
  }

  bartender() {
    this.user = 'ivop';
    this.pass = '123456';
  }


  iniciar() {
    this.usuario.pass = this.pass;
    this.usuario.user = this.user;
    console.log(this.usuario);
    const token = this.usuarioServ.InciarSesion(this.usuario);

    token.then( data => {
        localStorage.setItem('token', data);

        if (data.error === 'no se encuentra') {
          this.isError = true;
          this.error = 'El usuario y/o la contraseña son erroneos';
          console.log('nada');
        } else {
          if (data.error === 'baneado') {
            this.isError = true;
            this.error = 'El usuario se encuentra baneado';
          } else {
            const datos = this.helper.decodeToken(data);
            if (datos.data.estado === 1) {

              switch (datos.data.rol) {
                case 4:
                  this.router.navigate(['/Empleado/Mozo/NuevaComanda']);
                  break;
                case 10:
                  this.router.navigate(['/Admin/Pedidos']);
                  break;
                case 9:
                  this.router.navigate(['/Cliente/BuscarPedido']);
                  break;
                default:
                  this.router.navigate(['/Empleado/PedidosLive']);
                  break;
              }
              // Aca guardo para seguimiento.
              if (datos.data.tipo_usuario === 2) {
                this.usuarioServ.loginParaSeguimiento({cod_emp: datos.data.cod_emp})
                .then( hora => {
                  localStorage.setItem('horaentrada', hora);
                });
              }
            } else {
              console.log('not ok');
              console.log(datos.data);
              this.isError = true;
              this.error = 'Error del servidor';
            }
          }
        }
    }).catch( err => {
      console.error(err);
    });
  }

}
