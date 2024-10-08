import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

interface AuthResponse {
  refresh: string;
  access: string;
  user_id: number;
  nome: string;
  role: string;
}


@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  autenticar(cpf: string, senha: string): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login_loja/`,
      { cpf, senha },
      { observe: 'response'}
    ).pipe(
      tap((response) => {
        const authToken = response.body?.access || '';
        this.userService.salvarToken(authToken);
        this.buscarInfoUsuario(response.body?.user_id, response.body?.nome, response.body?.role);
      })
    );
  }

    private buscarInfoUsuario(userId: number | undefined, nome: string | undefined, role: string | undefined) {
      if (userId) {
        this.userService.setId(userId);
      } else {
        console.error('ID do usuário não fornecido.');
      }
      if (nome) {
        this.userService.setNome(nome);
      } else {
        console.error('Nome do usuário não fornecido.');
      }
      if (role) {
        this.userService.setUserRole(role);
      } else {
        console.error('Role do usuário não fornecido.');
      }
    }
}
