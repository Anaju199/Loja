import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../tipos';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<Usuario | null>(null);
  id!: number;

  constructor(private tokenService: TokenService, private http: HttpClient) {
    if (this.tokenService.possuiToken()) {
      this.decodificarJWT();
    }
  }

  private decodificarJWT() {
    const token = this.tokenService.retornarToken();
    if (token) {
      const user = jwt_decode(token) as Usuario;
      this.userSubject.next(user);
    }
  }

  retornarUser(): Observable<Usuario | null> {
    return this.userSubject.asObservable();
  }

  setId(id: number) {
    localStorage.setItem('id', id.toString());
  }

  retornarId(): string | null {
    return localStorage.getItem('id');
  }

  setNome(nome: string) {
    localStorage.setItem('nome', nome);
  }

  retornarNome(): string | null {
    return localStorage.getItem('nome');
  }

  salvarToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  logout() {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
    localStorage.removeItem('nome')
    localStorage.removeItem('id')
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }
}
