import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private loginService: LoginService, private router: Router) { }

  get isAuthenticated(): boolean {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    return usuario !== null;
  }

  public doLogin(data: any) {
    const request = {
      usuario: data.user,
      clave: data.pass
    };
    this.loginService.login(request).subscribe((resp: any) => {
      if (resp.token) {
        localStorage.setItem('usuario', JSON.stringify(resp));
        this.router.navigate(['/bienvenido']);
      } else {
        localStorage.setItem('usuario', null);
      }
    });
  }
}
