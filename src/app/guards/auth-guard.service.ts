import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = route.data.expectedRole;
    const expectedType = route.data.expectedType;
    console.log(expectedRole, this.authService.getTipo(), this.authService.getRol());

    if (!this.authService.isAuthenticated()
      || (expectedType && this.authService.getTipo() !== expectedType)
      || (expectedRole && this.authService.getRol() !== expectedRole)) {
      this.router.navigate(['/error']);
      return false;
    }

    return true
    /*
    if (this.auth.getTipo() === 3) { ADMIN
    if ( this.auth.getTipo() === 2) { EMPLEADO
    if ( this.auth.getTipo() ===  1) { USUARIO
    if (this.auth.getRol() === 4) { // MOZO
    if ( this.auth.getRol() !== 10 && this.auth.getRol() !== 4 && this.auth.getRol() !== 9 ) { PRODUCTOR

    // navigate to login page
    this.router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
    */
  }

}
