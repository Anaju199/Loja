import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Endereco } from '../tipos';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private readonly API = environment.apiUrl + 'loja_usuarios_enderecos'
  private readonly API_LISTA = environment.apiUrl + 'loja_lista_enderecos/'

  constructor(private http: HttpClient) { }


  listar(usuario?: string): Observable<Endereco[]> {
    let params = new HttpParams();

    if (usuario) {
          params = params.set("usuario", usuario);
    }

    return this.http.get<Endereco[]>(this.API_LISTA, { params });
  }

  listarPrincipal(usuario?: string): Observable<Endereco[]> {
    let params = new HttpParams();

    if (usuario) {
          params = params.set("usuario", usuario);
    }

    params = params.set("principal", true);

    return this.http.get<Endereco[]>(this.API_LISTA, { params });
  }

  listarTodos(): Observable<Endereco[]> {
    let params = new HttpParams()

    const url = `${this.API}/`
    return this.http.get<Endereco[]>(url)
  }

  editarPrincipal(endereco: Endereco): Observable<Endereco> {
    const url = `${this.API}/${endereco.id}/`
    return this.http.put<Endereco>(url, endereco)
  }

  buscarCadastro(): Observable<Endereco> {
    const url = `${this.API}/`
    return this.http.get<Endereco>(url);
  }

  criar(endereco: FormData): Observable<Endereco> {
    console.log(endereco)
    const url = `${this.API}/`
    return this.http.post<Endereco>(url, endereco);
  }

  editar(endereco: FormData, id?: number): Observable<Endereco> {
    const url = `${this.API}/${id}/`
    return this.http.put<Endereco>(url, endereco)
  }

  excluir(id: number): Observable<Endereco> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Endereco>(url)
  }

  buscarPorId(id: string): Observable<Endereco> {
    const url = `${this.API}/${id}/`
    return this.http.get<Endereco>(url)
  }

}
