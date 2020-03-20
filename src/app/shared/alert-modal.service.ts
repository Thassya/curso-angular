import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './../shared/alert-modal/alert-modal.component';

enum AlertTypes{
  DANGER = 'danger',
  SUCCESS = 'sucess'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(
    private modalService: BsModalService
  ) { }

  private showAlert(mensagem: string, type: string){
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = mensagem;
  }
  showAlertDanger(mensagem: string) {
    this.showAlert(mensagem, AlertTypes.DANGER);
  }

  showAlertSucesso(mensagem: string) {
    this.showAlert(mensagem, AlertTypes.SUCCESS);
  }
}
