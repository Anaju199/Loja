import { Injectable } from '@angular/core';
import { Tamanho } from './tipos';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TamanhosProdutoService {
  private readonly API =  environment.apiUrl + 'tamanho'
  private readonly API_LISTA =  environment.apiUrl + 'lista_tamanho/'

  constructor(private http: HttpClient) { }

  listar(produto_id: number): Observable<Tamanho[]> {

    let params = new HttpParams()
    .set("produto_id", produto_id)

    const url = `${this.API}/`
    return this.http.get<Tamanho[]>(url, {params})
  }

  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  criar(Tamanho: FormData): Observable<Tamanho> {
    const url = `${this.API}/`
    return this.http.post<Tamanho>(url, Tamanho)
  }

  editar(tamanho: Tamanho): Observable<Tamanho> {
    const url = `${this.API}/${tamanho.id}/`
    return this.http.put<Tamanho>(url, tamanho )
  }

  excluir(id: number): Observable<Tamanho> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Tamanho>(url)
  }

  buscarPorId(id: number): Observable<Tamanho> {
    const url = `${this.API}/${id}/`
    return this.http.get<Tamanho>(url)
  }

}
