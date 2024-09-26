import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pedido, Usuario } from '../tipos';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly API = environment.apiUrl + '/aj_pedidos'
  private readonly API_LISTA = environment.apiUrl + '/aj_lista_pedidos/'
  private readonly API_LISTA_USUARIO = environment.apiUrl + '/aj_lista_usuarios/'

  constructor(private http: HttpClient) { }

  listar(usuario?: string): Observable<Pedido[]> {
    let params = new HttpParams();

    if (usuario) {
          params = params.set("usuario", usuario);
    }

    return this.http.get<Pedido[]>(this.API_LISTA, { params });
  }

  listarTodos(): Observable<Pedido[]> {
    let params = new HttpParams()

    const url = `${this.API}/`
    return this.http.get<Pedido[]>(url)
  }

  listarNome(usuario?: string): Observable<Usuario[]> {
    let params = new HttpParams();

    if (usuario) {
          params = params.set("id", usuario);
    }

    return this.http.get<Usuario[]>(this.API_LISTA_USUARIO, { params })
  }


  criar(lideranca: FormData): Observable<Pedido> {
    const url = `${this.API}/`
    return this.http.post<Pedido>(url, lideranca);
  }

  setPedido(pedido: string) {
    localStorage.setItem('pedido', pedido);
  }

  retornarPedido(): string | null {
    return localStorage.getItem('pedido');
  }

  editar(id: number, lideranca: FormData): Observable<Pedido> {
    const url = `${this.API}/${id}/`
    return this.http.put<Pedido>(url, lideranca)
  }

  excluir(id: number): Observable<Pedido> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Pedido>(url)
  }

  buscarPorId(id: number): Observable<Pedido> {
    const url = `${this.API}/${id}/`
    return this.http.get<Pedido>(url)
  }
}
