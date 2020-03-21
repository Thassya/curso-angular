import { Injectable } from "@angular/core";
import { CanActivate, Resolve, RouterPreloader } from "@angular/router";
import { CursosService } from "./../cursos.service";
import { Curso } from "./../curso";

import { Observable, of } from "rxjs";
// import {  } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CursoResolverGuard implements Resolve<Curso> {
  constructor(private servico: CursosService) {}

  resolve(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ): Observable<Curso> | Promise<Curso> {
    if (route.params && route.params["id"]) {
      return this.servico.loadByID(route.params["id"]);
    }
    return of({
      id: null,
      nome: null
    });
  }
}
