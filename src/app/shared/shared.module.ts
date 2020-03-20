import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';



@NgModule({
  declarations: [
    AlertModalComponent],
  imports: [
    CommonModule
  ],
  exports:[
    AlertModalComponent
  ],
  entryComponents:[AlertModalComponent] //instanciado e utilizado em tempo de execucao.. n vai ser usado template nem roteamento, por exemplo
})
export class SharedModule { }
