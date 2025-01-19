import { card, payload } from './../tiposPagSeguro';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CSRFTokenService } from './csfrtoken.service';

const KEY = 'chavePublica';
declare const PagSeguro: any; 

@Injectable({
  providedIn: 'root'
})
export class PagSeguroService {

  private API_URL = 'http://localhost:8000/api/criar_chavePublica/';

  constructor(
      private http: HttpClient,
      private csfrTokenService: CSRFTokenService
    ) { }


  loadPagSeguroScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const scriptId = 'pagseguro-script';
      if (document.getElementById(scriptId)) {
        resolve(); // Script já foi carregado
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js';
      script.onload = () => resolve();
      script.onerror = () => reject('Falha ao carregar o script do PagSeguro.');
      document.body.appendChild(script);
    });
  }  

  encryptCard(cardData: card): { encryptedCard: string; hasErrors: boolean; errors: any } | null {      
    if (typeof PagSeguro === 'undefined') {
      console.error('PagSeguro SDK não carregado.');
      return null;
    }

    return PagSeguro.encryptCard(cardData);
  }

  criarChavePublica(payload: any): Observable<any> {
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
              // console.log('Response:', response);
              // observer.next(response);
              // observer.complete();
              this.salvarChavePS(response.publicKey)
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

  salvarChavePS(chave: string) {
    return localStorage.setItem(KEY, chave)
  }

  excluirChavePS() {
    localStorage.removeItem(KEY)
  }

  retornarChavePS() {
    return localStorage.getItem(KEY) ?? ''
  }
}
