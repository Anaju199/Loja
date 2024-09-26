import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../tipos';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private readonly API = environment.apiUrl + '/aj_usuarios'
  private readonly API_LISTA = environment.apiUrl + '/aj_lista_usuarios'

  constructor(private http: HttpClient) { }

  listarUsuario(id?: string): Observable<Usuario[]> {

    let params = new HttpParams()

    if (id) {
      params = params.set("id", id);
    }

    const url = `${this.API_LISTA}/`
    return this.http.get<Usuario[]>(url, {params})
  }

  listarTodos(): Observable<Usuario[]> {
    let params = new HttpParams()

    const url = `${this.API}/`
    return this.http.get<Usuario[]>(url)
  }


  buscarCadastro(): Observable<Usuario> {
    const url = `${this.API}/`
    return this.http.get<Usuario>(url);
  }

  criar(usuario: FormData): Observable<Usuario> {
    const url = `${this.API}/`
    return this.http.post<Usuario>(url, usuario);
  }

  editar(id: number, usuario: FormData): Observable<Usuario> {
    const url = `${this.API}/${id}/`
    return this.http.put<Usuario>(url, usuario)
  }

  excluir(id: number): Observable<Usuario> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Usuario>(url)
  }

  buscarPorId(id: number): Observable<Usuario> {
    const url = `${this.API}/${id}/`
    return this.http.get<Usuario>(url)
  }

}
