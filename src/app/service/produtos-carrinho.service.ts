import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Carrinho } from './tipos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosCarrinhoService {
  private readonly API =  environment.apiUrl + '/carrinho'
  private readonly API_LISTA =  environment.apiUrl + '/lista_carrinho/'

  constructor(private http: HttpClient) { }

  listar(Produto: string): Observable<Carrinho[]> {

    let params = new HttpParams()

      params = params.set("Produto", Produto)

    return this.http.get<Carrinho[]>(this.API_LISTA, {params})
  }

  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  criar(Carrinho: any): Observable<Carrinho> {
    const url = `${this.API}/`
    return this.http.post<Carrinho>(url, Carrinho)
  }

  editar(imagem: Carrinho): Observable<Carrinho> {
    const url = `${this.API}/${imagem.id}/`
    return this.http.put<Carrinho>(url, imagem )
  }

  excluir(id: number): Observable<Carrinho> {
    const url = `${this.API}/${id}`
    return this.http.delete<Carrinho>(url)
  }

  buscarPorId(id: number): Observable<Carrinho> {
    const url = `${this.API}/${id}/`
    return this.http.get<Carrinho>(url)
  }
}
