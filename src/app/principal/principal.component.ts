import { Component, OnInit } from '@angular/core';
import { EscolaService } from '../escola.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/model/usuario';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  hide = true;
  logged = false;
  login = "";
  senha = "";
  user: Usuario = {} as Usuario;

  constructor(private service: EscolaService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  autenticar() {
    if (!this.login) {
      this._snackBar.open('Inserir um usuario');
      return;
    }

    if (!this.senha) {
      this._snackBar.open('Inserir uma senha');
      return;
    }

    this.user.login = this.login;
    this.user.senha = this.senha;

    this.service.autenticar(this.user)
      .subscribe(
        data => {
          this.logged = true;
          this.user = data;
          console.log(this.user);
        },
        error => {
          if (error.error.message) {
            this._snackBar.open(error.error.message);
          } else {
            this._snackBar.open(error.message);
          }
        }
      )
  }

  cadastrar() {
    this.service.cadastrarAlunos(this.user.token)
    .subscribe(
      data => {
        this._snackBar.open('Alunos cadastrados com sucesso');
      },
      error => {
        if (error.error.message) {
          this._snackBar.open(error.error.message);
        } else {
          this._snackBar.open(error.message);
        }
      }
    )
  }

  gerarRelatorio() {
    this.service.gerarRelatorio(this.user.token)
    .subscribe(
      (data) => {
        this._snackBar.open('Relatorio gerado com sucesso');

        const blob = new Blob([data], {type: ''});

        const downloadUrl = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = '';
        link.click();
      },
      error => {
        if (error.error.message) {
          this._snackBar.open(error.error.message);
        } else {
          this._snackBar.open(error.message);
        }
      }
    )
  }

}
