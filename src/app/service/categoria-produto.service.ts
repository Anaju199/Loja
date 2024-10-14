import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoriaProduto } from './tipos';


@Injectable({
  providedIn: 'root'
})
export class CategoriaProdutoService {
  private readonly API =  environment.apiUrl + '/categoria_produto'
  private readonly API_LISTA =  environment.apiUrl + '/lista_categoria_produto/'

  constructor(private http: HttpClient) { }

  listar(Produto: string): Observable<CategoriaProduto[]> {

    let params = new HttpParams()

      params = params.set("Produto", Produto)

    return this.http.get<CategoriaProduto[]>(this.API_LISTA, {params})
  }

  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  criar(CategoriaProduto: FormData): Observable<CategoriaProduto> {
    const url = `${this.API}/`
    return this.http.post<CategoriaProduto>(url, CategoriaProduto)
  }

  editar(disponibilidade: CategoriaProduto): Observable<CategoriaProduto> {
    const url = `${this.API}/${disponibilidade.id}/`
    return this.http.put<CategoriaProduto>(url, disponibilidade )
  }

  excluir(id: number): Observable<CategoriaProduto> {
    const url = `${this.API}/${id}`
    return this.http.delete<CategoriaProduto>(url)
  }

  buscarPorId(id: number): Observable<CategoriaProduto> {
    const url = `${this.API}/${id}/`
    return this.http.get<CategoriaProduto>(url)
  }

}
