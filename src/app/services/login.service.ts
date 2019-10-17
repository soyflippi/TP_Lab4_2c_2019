import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  // URL API
  private _URL = 'http://localhost:3000/';

  public listUser = [
    {
      usuario: '@admin', clave: '123456'
    },
    {
      usuario: '@cliente', clave: '654321'
    },
    {
      usuario: '@visitante', clave: '13579'
    }];


  public login(data: any) {
    return this.httpClient.post(this._URL + 'auth/login', data);
  }
}
