import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Disponibilidade } from './tipos';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadeProdutoService {
  private readonly API =  environment.apiUrl + 'disponibilidade'
  private readonly API_LISTA =  environment.apiUrl + 'lista_disponibilidade/'

  constructor(private http: HttpClient) { }

  listar(Produto: string): Observable<Disponibilidade[]> {

    let params = new HttpParams()

      params = params.set("Produto", Produto)

    return this.http.get<Disponibilidade[]>(this.API_LISTA, {params})
  }

  listarTodos(pagina: number, itensPorPagina: number): Observable<any> {
    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPorPagina)

    const url = `${this.API}/`
    return this.http.get<any>(url, {params})
  }

  criar(Disponibilidade: FormData): Observable<Disponibilidade> {
    const url = `${this.API}/`
    return this.http.post<Disponibilidade>(url, Disponibilidade)
  }

  editar(disponibilidade: Disponibilidade): Observable<Disponibilidade> {
    const url = `${this.API}/${disponibilidade.id}/`
    return this.http.put<Disponibilidade>(url, disponibilidade )
  }

  excluir(id: number): Observable<Disponibilidade> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Disponibilidade>(url)
  }

  buscarPorId(id: number): Observable<Disponibilidade> {
    const url = `${this.API}/${id}/`
    return this.http.get<Disponibilidade>(url)
  }

}
