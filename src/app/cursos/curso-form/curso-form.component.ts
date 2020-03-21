import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";

import { AlertModalService } from "./../../shared/alert-modal.service";
import { CursosService } from "./../cursos.service";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";

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
    // this.route.params
    // .pipe(
    //   map((params: any) => params["id"]),
    //   switchMap(id => this.servico.loadByID(id)),
    //   // switchMap(cursos => obterAulas)
    //   )
    //   .subscribe(curso =>
    //     this.updateForm(curso));

    // concatMap -> oridem da requisicao importa
    // mergeMap -> nao importa a ordem
    // exhaustMap -> faz uma requisicao e espera a respota... faz segunda e espera a respota (comum em login)

    const curso = this.route.snapshot.data["curso"];

    this.form = this.fb.group({
      id: [curso.id],
      nome: [
        curso.nome,
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
