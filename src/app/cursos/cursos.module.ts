import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { CursosComponent } from './cursos.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursosService } from './cursos.service';
import { CursosRoutingModule } from './cursos.routing.module';
import { CursoFormComponent } from './curso-form/curso-form.component';


@NgModule({
    imports: [
        CommonModule,
        CursosRoutingModule,
        HttpClientModule  ,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        CursosComponent,
        CursoDetalheComponent,
        CursoNaoEncontradoComponent,
        CursoFormComponent
    ],
    providers: [CursosService],
})
export class CursosModule { }
