import { Injectable } from '@angular/core';
import { Imagem } from './tipos';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FotosProdutoService {
  private readonly API =  environment.apiUrl + 'imagem'
  private readonly API_LISTA =  environment.apiUrl + 'lista_imagem/'

  constructor(private http: HttpClient) { }

  listar(Produto: string): Observable<Imagem[]> {

    let params = new HttpParams()

      params = params.set("Produto", Produto)

    return this.http.get<Imagem[]>(this.API_LISTA, {params})
  }

  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  criar(Imagem: FormData): Observable<Imagem> {
    const url = `${this.API}/`
    return this.http.post<Imagem>(url, Imagem)
  }

  editar(id: number, imagem: FormData): Observable<Imagem> {
    const url = `${this.API}/${id}/`
    return this.http.put<Imagem>(url, imagem )
  }

  excluir(id: number): Observable<Imagem> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Imagem>(url)
  }

  buscarPorId(id: number): Observable<Imagem> {
    const url = `${this.API}/${id}/`
    return this.http.get<Imagem>(url)
  }

}
