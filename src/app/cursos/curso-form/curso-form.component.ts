import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";

import { AlertModalService } from "./../../shared/alert-modal.service";
import { CursosService } from "./../cursos.service";
import { ActivatedRoute } from "@angular/router";

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
    private localtion: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const id = params["id"];
      const curso$ = this.servico.loadByID(id);
      curso$.subscribe(curso => {
        this.updateForm(curso);
      });
    });

    this.form = this.fb.group({
      id: [null],
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

  updateForm(curso) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    });
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
