import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto } from './tipos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private readonly API = environment.apiUrl + '/produto'
  private readonly API_LISTA = environment.apiUrl + '/lista_produtos'
  private produtosFiltradosSubject = new BehaviorSubject<Produto[]>([]);

  constructor(private http: HttpClient) { }

  produtosFiltrados$ = this.produtosFiltradosSubject.asObservable();

  setProdutosFiltrados(listaProdutos: Produto[]): void {
    this.produtosFiltradosSubject.next(listaProdutos);
  }

  listar(filtroProduto: string): Observable<Produto[]> {
    let params = new HttpParams()

    if(filtroProduto.trim().length > 0){
      params = params.set("descricao",filtroProduto)
    }

    const url = `${this.API}/`
    return this.http.get<Produto[]>(url, {params})
  }

  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  listarPesquisa(filtroProduto: string, pagina: number, itensPorPagina: number): Observable<Produto[]> {

    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    if(filtroProduto.trim().length > 0){
      params = params.set("filtro",filtroProduto)
    }

    const url = `${this.API_LISTA}/`
    return this.http.get<Produto[]>(url, {params})
  }

  criar(Produto: FormData): Observable<Produto> {
    const url = `${this.API}/`
    return this.http.post<Produto>(url, Produto)
  }

  editar(produto: Produto): Observable<Produto> {
    const url = `${this.API}/${produto.id}/`
    return this.http.put<Produto>(url, produto)
  }

  excluir(id: number): Observable<Produto> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Produto>(url)
  }

  buscarPorId(id: number): Observable<Produto> {
    const url = `${this.API}/${id}/`
    return this.http.get<Produto>(url)
  }
}
