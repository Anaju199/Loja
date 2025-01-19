import { payload } from './../tiposPagSeguro';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { CSRFTokenService } from './csfrtoken.service';


@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  // private readonly API = environment.apiUrlPagSeguro + '/orders'
  // private API_URL = 'http://localhost:8000/api/create/';
  private API_URL = 'http://localhost:8000/api/criar_chavePublica/';
  private readonly API = environment.apiUrl + '/api/create/'
  private readonly API_LISTA = environment.apiUrlPagSeguro + '/orders/'

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private csfrTokenService: CSRFTokenService
  ) { }

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

  // criar(payload: payload): Observable<payload> {
  //   const url = `${this.API}`
  //   return this.http.post<payload>(url, payload, { withCredentials: true });
  // }

  criar(payload: any): Observable<any> {
    const token = '7565bedb-7b2c-4990-b6da-2f1ba7c3353b57190ff84fb5b9952120c65df1e0975475bb-d2e7-4cc6-923f-e994903b05ed'//this.tokenService.retornarTokenApi();
    return new Observable(observer => {
      this.csfrTokenService.getCSRFToken().subscribe(
        response => {
          console.log('CSRF token obtained:', response);
          const csrfToken = this.csfrTokenService.getCSRFTokenFromCookies();
          const headers = new HttpHeaders({
            'X-CSRFToken': csrfToken || '',
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
            'content-type': 'application/json'
          });

          this.http.post<any>(this.API_URL, payload, { headers, withCredentials: true }).subscribe(
            response => {
              console.log('Response:', response);
              observer.next(response);
              observer.complete();
            },
            error => {
              console.error('Error creating payload:', error);
              // observer.error(error);
            }
          );
        },
        error => {
          console.error('Error getting CSRF token:', error);
          observer.error(error);
        }
      );
    });
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
