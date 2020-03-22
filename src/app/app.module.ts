import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
// import { MaterializeModule } from "angular2-materialize";
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service'; //nao precisa mais injetar servicos root...
import { AuthGuard } from './guard/auth.guard'; //coloquei só pq sim
import { CursosGuard } from './guard/cursos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent
     
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // MaterializeModule,
    ModalModule.forRoot(),
    SharedModule,
    HttpClientModule,
    // CursosModule,
    // AlunosModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard, CursosGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
