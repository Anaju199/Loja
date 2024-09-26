import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Contato } from './contato';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private readonly API = environment.apiUrl + '/contatos/'
  // private readonly API = environment.apiUrl + '/contatos/'
  private readonly API_EMAIL = environment.apiUrl + '/contatoEmail'

  constructor(private http: HttpClient) { }

  criar(contato: FormData): Observable<Contato> {
    return this.http.post<Contato>(this.API, contato)
  }

  enviarEmail(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.API_EMAIL, contato)
  }
}
