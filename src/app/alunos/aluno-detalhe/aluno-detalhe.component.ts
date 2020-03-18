import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlunosService } from './../alunos.service';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from '../aluno';


@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {

  id: number;
  inscricao: Subscription;
  aluno: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunosService: AlunosService

  ) { }

  ngOnInit(): void {
    // this.inscricao = this.route.params.subscribe(
    //   (params: any) => {
    //     let id = params['id'];
        
    //     this.aluno = this.alunosService.getAluno(id);
    //   }
    // );
      this.inscricao = this.route.data.subscribe(
        (info: {aluno: Aluno}) => {
          console.log(info);
          this.aluno = info.aluno;
        }
      )
  }

  editarContato(){
    this.router.navigate(['/alunos', this.aluno.id, 'editar']);
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
