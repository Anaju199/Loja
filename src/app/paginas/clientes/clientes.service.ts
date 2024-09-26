import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private readonly API =  environment.apiUrl + '/clientes/'
  private readonly API_LISTA =  environment.apiUrl + '/lista_clientes/'

  constructor(private http: HttpClient) { }

  listar(): Observable<Cliente[]> {

    let params = new HttpParams()

      // params = params.set("", )

    return this.http.get<Cliente[]>(this.API, {params})
  }

  listarTodos(): Observable<Cliente[]> {
    let params = new HttpParams()

    const url = `${this.API}/`
    return this.http.get<Cliente[]>(url)
  }

  criar(Cliente: FormData): Observable<Cliente> {
    const url = `${this.API}/`
    return this.http.post<Cliente>(url, Cliente)
  }

  editar(id: number, Cliente: FormData): Observable<Cliente> {
    const url = `${this.API}/${id}/`
    return this.http.put<Cliente>(url, Cliente )
  }

  excluir(id: number): Observable<Cliente> {
    const url = `${this.API}/${id}`
    return this.http.delete<Cliente>(url)
  }

  buscarPorId(id: number): Observable<Cliente> {
    const url = `${this.API}/${id}/`
    return this.http.get<Cliente>(url)
  }
}
