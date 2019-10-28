import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Response, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class HttpserviceService {

  token = localStorage.getItem('token');
  constructor(public http: HttpClient) { }

  public GetObservable<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  public putHttp(url: string, objeto: any) {
    return this.http.put(url, objeto)
      .toPromise()
      .then(this.darDatos)
      .catch(this.handleError);
  }

  public postHttp(url: string, object) {
    return this.http.post(url, object)
      .toPromise()
      .then(this.darDatos)
      .catch(this.handleError);
  }

  public deleteHttp(url: string, object) {
    return this.http.delete(url, object)
      .toPromise()
      .then(this.darDatos)
      .catch(this.handleError);
  }

  public patchHttp(url: string, object: any) {
    return this.http.patch(url, object)
      .toPromise()
      .then()
      .catch(this.handleError);
  }

  public getHttp(url: string) {
    return this.http.get(url)
      .toPromise()
      .then(this.darDatos)
      .catch(this.handleError);
  }

  public handleError(error: Error) {
    console.info(error);
    throwError(new Error(error.message));
    return error;
  }

  private extractData(res: Response) {
    return res.json() || {};
  }

  darDatos(dato) {
    return dato;
  }
}
