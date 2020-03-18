import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunosComponent } from './alunos.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosGuard } from './../guard/alunos.guard';
import { AlunosDeactivateGuard } from './../guard/alunos-deactivate.guard';
import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';

const alunosRoutes: Routes = [
    {
        path: '', component: AlunosComponent,
        canActivateChild: [AlunosGuard],
        children: [
            { path: 'novo', component: AlunoFormComponent },
            {
                path: ':id',
                component: AlunoDetalheComponent,
                resolve: { aluno : AlunoDetalheResolver } //carrega antes do componente..
            },
            {
                path: ':id/editar',
                component: AlunoFormComponent,
                canDeactivate: [AlunosDeactivateGuard]
            }
        ]
    }
]; //precisa colocar o router-outlet dentro do alunos.component.html para que as rotas filhas funcionem! ele renderiza os dois componentes juntos... o pai e o filho. Caso nao queira isso nao declare children... :D

@NgModule({
    imports: [RouterModule.forChild(alunosRoutes)],
    exports: [RouterModule]
})
export class AlunosRoutingModule { }
