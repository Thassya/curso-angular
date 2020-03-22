import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { CursosGuard } from './guard/cursos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';


const routes: Routes = [
  // {
  //   path: 'driven',
  //   component: FormDrivenComponent
  // },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule),  //lazyloading
    // canActivate: [AuthGuard],
    // canActivateChild: [CursosGuard],
    // canLoad: [AuthGuard]
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload-file/upload-file.module').then(m => m.UploadFileModule),  //lazyloading
  },
  {
    path: 'busca-reativa',
    loadChildren: () => import('./reactive-search/reactive-search.module').then(m => m.ReactiveSearchModule),  //lazyloading
  },
  {
    path: 'alunos',
    loadChildren: () => import('./alunos/alunos.module').then(m => m.AlunosModule),
    canActivate: [AuthGuard],
    // canActivateChild: [AlunosGuard]
    canLoad: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent,
    // canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/busca-reativa', pathMatch: 'full' },
  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
