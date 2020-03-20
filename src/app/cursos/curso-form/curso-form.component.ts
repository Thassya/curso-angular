import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";

import { AlertModalService } from "./../../shared/alert-modal.service";
import { CursosService } from "./../cursos.service";

@Component({
  selector: "app-curso-form",
  templateUrl: "./curso-form.component.html",
  styleUrls: ["./curso-form.component.css"]
})
export class CursoFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private servico: CursosService,
    private modal: AlertModalService,
    private localtion: Location
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250)
        ]
      ]
    });
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;

    console.log(this.form.value);
    if (this.form.valid) {
      this.servico.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSucesso("Criado com sucesso!");
          this.localtion.back();
        },
        error =>
          this.modal.showAlertDanger("Erro ao criar curso, tente novamente."),
        () => console.log("request ok")
      );
    }
  }
  onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
