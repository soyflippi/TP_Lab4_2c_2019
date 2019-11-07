import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwt: JwtHelperService = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
  }

  public getUser(): string {
    let token = this.getToken();
    let datos = jwt.decodeToken(token);
    let user = datos.data.cod_emp;
    return user;
  }

  public getTipo(): number {
    let token = this.getToken();
    let datos = jwt.decodeToken(token);
    let tipo = datos.data.tipo_usuario;

    return tipo;
  }

  public getEntrada(): number {
    let token = this.getToken();
    let datos = jwt.decodeToken(token);
    let horaentrada = datos.data.horaentrada;

    return horaentrada;
  }

  public getRol(): number {
    let token = this.getToken();
    let datos = jwt.decodeToken(token);
    let rol = datos.data.rol;
    return rol;
  }

  //retorna el token
  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    if(token) return jwt.isTokenExpired(token);
    // return a boolean reflecting
    // whether or not the token is expired
    return false;
  }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async pausa(ms) {
    console.log('Taking a break...');
    await this.sleep(ms);
    console.log('Two second later');
  }

}
