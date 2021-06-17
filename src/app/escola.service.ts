import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {
  baseUrl = 'https://localhost:5001/api/Escola/'

  constructor(private http: HttpClient) { }

  autenticar(usuario: Usuario) {
    return this.http.post<Usuario>(this.baseUrl + 'autenticar', usuario);
  }

  cadastrarAlunos(token: string) {
    const httpOptions = {
      headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + token)
    };

    return this.http.post(this.baseUrl + 'cadastrar', httpOptions);
  }

  gerarRelatorio(token: string) {
    const httpOptions = {
      headers: new HttpHeaders()
      .set('content-type', 'application/json')
      .set('authorization', 'Bearer ' + token)
    };

    return this.http.get<Blob>(this.baseUrl + 'gerarRelatorio', httpOptions);
  }
}
