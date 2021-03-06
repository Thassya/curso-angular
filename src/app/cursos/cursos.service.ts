import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Curso } from "./curso";
import { tap, delay, take } from "rxjs/operators";
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class CursosService {
  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Curso[]>(this.API).pipe(delay(200), tap(console.log));
  }

  private create(curso) {
    return this.http.post(this.API, curso).pipe(take(1)); //unsubscribe
  }

  private update(curso){
    console.log(curso);
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }

  loadByID(id) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }
  
  save(curso){
    if(curso.id){
      return this.update(curso);
    }
    return this.create(curso);
  }

  getCursos() {
    return [
      { id: 1, nome: "Angular" },
      { id: 2, nome: "C#" }
    ];
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
}
