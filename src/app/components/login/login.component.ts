import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../classes/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';

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
  captchaCodigo: string;
  captchaIngresado: string = '';

  helper = new JwtHelperService();

  constructor(public usuarioServ: UsuariosService, public router: Router, public routes: ActivatedRoute, public auth: AuthService) {
    this.usuario = new Usuario();
    this.generarCaptcha();
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
    this.isError = false;
    this.usuario.pass = this.pass;
    this.usuario.user = this.user;
    console.log(this.usuario);
    const token = this.usuarioServ.InciarSesion(this.usuario);

    token.then(data => {
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
              this.usuarioServ.loginParaSeguimiento({ cod_emp: datos.data.cod_emp })
                .then(hora => {
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
    }).catch(err => {
      console.error(err);
    });
  }

  generarCaptcha() {
    this.captchaIngresado = '';
    var chr1 = Math.ceil(Math.random() * 10) + '';
    var chr2 = Math.ceil(Math.random() * 10) + '';
    var chr3 = Math.ceil(Math.random() * 10) + '';
    var chr4 = Math.ceil(Math.random() * 10) + '';
    var chr5 = Math.ceil(Math.random() * 10) + '';
    var chr6 = Math.ceil(Math.random() * 10) + '';
    var chr7 = Math.ceil(Math.random() * 10) + '';
    this.captchaCodigo = chr1 + ' ' + chr2 + ' ' + chr3 + ' ' + chr4 + ' ' + chr5 + ' ' + chr6 + ' ' + chr7;
  }

  /* Validating Captcha Function */
  validarCaptcha() {
    const str1 = this.removerEspacios(this.captchaCodigo);
    const str2 = this.removerEspacios(this.captchaIngresado);

    if (str1 == str2) return true;
    return false;
  }

  /* Remove spaces from Captcha Code */
  removerEspacios(string) {
    return string.split(' ').join('');
  }

}
