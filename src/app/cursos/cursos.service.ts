import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';
import { tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  getCursos() {
    return [
      { id: 1, nome: 'Angular' },
      { id: 2, nome: 'C#' }
    ]
  }
  getCurso(id: number) {
    let cursos = this.getCursos();
    for (let i = 0; i < cursos.length; i++) {
      let curso = cursos[i];
      if (curso.id == id) {
        return cursos;
      }
    }
    return null;
  }
  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<Curso[]>(this.API)
    .pipe(
      tap(console.log)
    );
  }
}
