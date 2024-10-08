import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cor } from './tipos';

@Injectable({
  providedIn: 'root'
})
export class CoresProdutosService {
  private readonly API = environment.apiUrl + '/cor'
  private readonly API_LISTA = environment.apiUrl + '/lista_cores'
  private produtosFiltradosSubject = new BehaviorSubject<Cor[]>([]);

  constructor(private http: HttpClient) { }

  produtosFiltrados$ = this.produtosFiltradosSubject.asObservable();

  setProdutosFiltrados(listaProdutos: Cor[]): void {
    this.produtosFiltradosSubject.next(listaProdutos);
  }

  listar(): Observable<Cor[]> {

    const url = `${this.API}/`
    return this.http.get<Cor[]>(url, {})
  }

  // listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
  //   let params = new HttpParams()
  //     .set("_page", pagina)
  //     .set("_limit", itensPorPagina)

  //   const url = `${this.API}/`
  //   return this.http.get<any>(url, {params})
  // }

  listarPesquisa(filtroProduto: string, pagina: number, itensPorPagina: number): Observable<Cor[]> {

    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    if(filtroProduto.trim().length > 0){
      params = params.set("filtro",filtroProduto)
    }

    const url = `${this.API_LISTA}/`
    return this.http.get<Cor[]>(url, {params})
  }

  criar(Cor: FormData): Observable<Cor> {
    const url = `${this.API}/`
    return this.http.post<Cor>(url, Cor)
  }

  editar(produto: Cor): Observable<Cor> {
    const url = `${this.API}/${produto.id}/`
    return this.http.put<Cor>(url, produto)
  }

  excluir(id: number): Observable<Cor> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Cor>(url)
  }

  buscarPorId(id: number): Observable<Cor> {
    const url = `${this.API}/${id}/`
    return this.http.get<Cor>(url)
  }
}
