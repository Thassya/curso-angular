import { Injectable, EventEmitter } from '@angular/core';

import { Usuario } from './usuario';
import { Router } from '@angular/router';
import {  } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;
  mostrarMenuEmiiter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario) {
    if (usuario.nome === 'usuario@email.com' && usuario.senha === '123') {
      this.usuarioAutenticado = true;
      this.mostrarMenuEmiiter.emit(true);

      this.router.navigate(['/']);
    }
    else {
      this.usuarioAutenticado = false;
      this.mostrarMenuEmiiter.emit(false);

    }
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }
}
