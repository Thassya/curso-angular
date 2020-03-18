import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service'; //nao precisa mais injetar servicos root...
import { AuthGuard } from './guard/auth.guard'; //coloquei só pq sim
import { CursosGuard } from './guard/cursos.guard';

@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // HttpModule,
    // CursosModule,
    // AlunosModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard, CursosGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
