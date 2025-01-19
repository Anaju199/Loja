import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { itemPedido, Pedido, Usuario } from '../tipos';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly API = environment.apiUrl + 'pedido'
  private readonly API_ITEM = environment.apiUrl + 'itemPedido'
  private readonly API_ITEM_PEDIDO = environment.apiUrl + 'lista_itens_pedido'
  private readonly API_LISTA = environment.apiUrl + 'lista_pedidos/'
  private readonly API_LISTA_USUARIO = environment.apiUrl + 'lista_usuarios/'

  constructor(private http: HttpClient) { }

  listar(usuario?: string): Observable<Pedido[]> {
    let params = new HttpParams();

    if (usuario) {
          params = params.set("cliente", usuario);
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


  criar(pedido: any): Observable<Pedido> {
    const url = `${this.API}/`
    return this.http.post<Pedido>(url, pedido);
  }
  
  criarItemPedido(itemPedido: any): Observable<Pedido> {
    const url = `${this.API_ITEM}/`
    return this.http.post<Pedido>(url, itemPedido);
  }

  setPedido(pedido: string) {
    localStorage.setItem('pedido', pedido);
  }
  
  removePedido() {
    localStorage.removeItem('pedido')
  }

  retornarPedido(): string | null {
    return localStorage.getItem('pedido');
  }

  editar(id: number, pedido: any): Observable<Pedido> {
    const url = `${this.API}/${id}/`
    return this.http.put<Pedido>(url, pedido)
  }

  excluir(id: number): Observable<Pedido> {
    const url = `${this.API}/${id}/`
    return this.http.delete<Pedido>(url)
  }

  buscarPorId(id: number): Observable<Pedido> {
    const url = `${this.API}/${id}/`
    return this.http.get<Pedido>(url)
  }
  
  buscarItemPorIdPedido(id: number): Observable<itemPedido[]> {
    let params = new HttpParams();

    if (id) {
          params = params.set("pedido", id);
    }

    const url = `${this.API_ITEM_PEDIDO}/`
    return this.http.get<itemPedido[]>(url, {params})
  }
}
