import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private loginService: LoginService) { }

  get isAuthenticated(): boolean {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    return usuario !== null;
  }

  public doLogin(data: any) {
    this.loginService.login(data).subscribe((data: any) => {
      if (data) {
        localStorage.setItem('usuario', JSON.stringify(data));
      } else {
        localStorage.setItem('usuario', null);
      }
    });
  }
}
