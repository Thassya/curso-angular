import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = 'http://localhost:3000/cursos';

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
