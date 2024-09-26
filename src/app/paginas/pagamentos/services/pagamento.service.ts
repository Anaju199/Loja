import { payload } from './../tiposPagSeguro';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  private readonly API = environment.apiUrlPagSeguro + '/orders'
  private readonly API_LISTA = environment.apiUrlPagSeguro + '/orders/'

  constructor(private http: HttpClient) { }

  listar(payload?: string): Observable<payload[]> {
    let params = new HttpParams();

    if (payload) {
          params = params.set("payload", payload);
    }

    return this.http.get<payload[]>(this.API_LISTA, { params });
  }


  listarTodos(): Observable<payload[]> {
    let params = new HttpParams()

    const url = `${this.API}/`
    return this.http.get<payload[]>(url)
  }


  buscarCadastro(): Observable<payload> {
    const url = `${this.API}/`
    return this.http.get<payload>(url);
  }

  criar(payload: payload): Observable<payload> {
    const url = `${this.API}`
    console.log('url criar',url)
    return this.http.post<payload>(url, payload);
  }

  editar(id: number, payload: payload): Observable<payload> {
    const url = `${this.API}/${id}/`
    return this.http.put<payload>(url, payload)
  }

  excluir(id: number): Observable<payload> {
    const url = `${this.API}/${id}/`
    return this.http.delete<payload>(url)
  }

  buscarPorId(id: number): Observable<payload> {
    const url = `${this.API}/${id}/`
    return this.http.get<payload>(url)
  }
}
