import { Injectable } from '@angular/core';

const KEY = 'token';
const KEYApi = '7565bedb-7b2c-4990-b6da-2f1ba7c3353b57190ff84fb5b9952120c65df1e0975475bb-d2e7-4cc6-923f-e994903b05ed';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  salvarToken(token: string) {
    return localStorage.setItem(KEY, token)
  }

  excluirToken() {
    localStorage.removeItem(KEY)
  }

  retornarToken() {
    return localStorage.getItem(KEY) ?? ''
  }

  possuiToken() {
    return !!this.retornarToken();
  }

  retornarTokenApi() {
    return localStorage.getItem(KEYApi) ?? ''
  }
}


