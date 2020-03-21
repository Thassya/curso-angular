import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CursosComponent } from "./cursos.component";
import { CursoDetalheComponent } from "./curso-detalhe/curso-detalhe.component";
import { CursoNaoEncontradoComponent } from "./curso-nao-encontrado/curso-nao-encontrado.component";
import { CursoFormComponent } from "./curso-form/curso-form.component";
import { CursoResolverGuard } from "./guards/curso-resolver.guard";

const cursosRoutes: Routes = [
  { path: "", component: CursosComponent },
  { path: "naoEncontrado", component: CursoNaoEncontradoComponent },
  {
    path: "novo",
    component: CursoFormComponent,
    resolve: {
      curso: CursoResolverGuard
    }
  },
  {
    path: "editar/:id",
    component: CursoFormComponent,
    resolve: {
      curso: CursoResolverGuard
    }
  },
  // { path: ":id", component: CursoDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)],
  exports: [RouterModule]
})
export class CursosRoutingModule {}
