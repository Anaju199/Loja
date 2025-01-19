import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Favorito } from './tipos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosFavoritosService {
  private readonly API =  environment.apiUrl + 'favorito'
  private readonly API_ISFAVORITO =  environment.apiUrl + 'isFavorito'
  private readonly API_LISTA =  environment.apiUrl + 'lista_favoritos/'

  constructor(private http: HttpClient) { }

  listar(cliente: string | null): Observable<any[]> {

    let params = new HttpParams()

    if(cliente){
      params = params.set("cliente", cliente)
    }

    return this.http.get<any[]>(this.API_LISTA, {params})
  }

  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  criar(Favorito: any): Observable<Favorito> {
    const url = `${this.API}/`
    return this.http.post<Favorito>(url, Favorito)
  }

  editar(imagem: Favorito): Observable<Favorito> {
    const url = `${this.API}/${imagem.id}/`
    return this.http.put<Favorito>(url, imagem )
  }

  excluir(id: number): Observable<Favorito> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Favorito>(url)
  }

  buscarPorId(id: number): Observable<Favorito> {
    const url = `${this.API}/${id}/`
    return this.http.get<Favorito>(url)
  }

  buscarPorClientePorProduto(produto: number, cliente: string | null): Observable<any> {
    let params = new HttpParams()
      .set("produto", produto)
      
      if(cliente){
        params = params.set("cliente", cliente)
      }

    const url = `${this.API_ISFAVORITO}/`
    return this.http.get<any>(url, {params})
  }
}
