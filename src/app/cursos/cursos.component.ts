import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, empty, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { CursosService } from './cursos.service';
import { Curso } from './curso';
import { AlertModalService } from './../shared/alert-modal.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  '  // cursos: Curso[];'
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  // pagina: number;
  // inscricao: Subscription;

  constructor(
    private service: CursosService,  
    private alertService: AlertModalService,  
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.service.list()
    // .subscribe(dados => this.cursos = dados);
    // this.cursos = this.cursosService.getCursos();

    // this.inscricao = this.route.queryParams.subscribe(
    //   (queryParams: any) => {
    //     this.pagina = queryParams['pagina'];
    //   }
    // )
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list() //com o pipeAsync nao precisa se preocupar em inscrever e desisncrever.. o angular cuida disso. 
      .pipe(
        // map(),
        // tap(),
        // switchMap(),
        catchError(error => {
          console.error(error);
          this.handleError();
          // this.error$.next(true);
          return empty();
        })
      );
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar curso. Tente novamente mais tarde');
  }


  ngOnDestoroy() {
    // this.inscricao.unsubscribe();

  }

  proximaPagina() {
    // this.router.navigate(['/cursos'], {queryParams:{'pagina': ++this.pagina}});
  }

}
