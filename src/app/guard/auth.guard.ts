import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './../login/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    return this.verificarAcesso();

  }

  private verificarAcesso() {
    if (this.authService.usuarioEstaAutenticado())
      return true;

    this.router.navigate(['/login']);
    return false;
  }

  canLoad(
    route: Route,
    segments: import("@angular/router").UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log('canLoad: verificando se o usuário pode carregar o cod do módulo');

    return this.verificarAcesso();

  }
}
