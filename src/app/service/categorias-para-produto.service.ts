import { Injectable } from '@angular/core';
import { Categoria } from './tipos';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriasParaProdutoService {
  private readonly API =  environment.apiUrl + '/categoria'
  private readonly API_LISTA =  environment.apiUrl + '/lista_categoria/'

  constructor(private http: HttpClient) { }

  listar(): Observable<Categoria[]> {

    // let params = new HttpParams()
    // .set("produto_id", produto_id)

    const url = `${this.API}/`
    return this.http.get<Categoria[]>(url, {})
  }

  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  criar(Categoria: FormData): Observable<Categoria> {
    const url = `${this.API}/`
    return this.http.post<Categoria>(url, Categoria)
  }

  editar(categoria: Categoria): Observable<Categoria> {
    const url = `${this.API}/${categoria.id}/`
    return this.http.put<Categoria>(url, categoria )
  }

  excluir(id: number): Observable<Categoria> {
    const url = `${this.API}/${id}`
    return this.http.delete<Categoria>(url)
  }

  buscarPorId(id: number): Observable<Categoria> {
    const url = `${this.API}/${id}/`
    return this.http.get<Categoria>(url)
  }

}
