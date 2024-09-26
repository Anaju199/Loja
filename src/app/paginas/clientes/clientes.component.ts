import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { environment } from 'src/environments/environment';
import { ClientesService } from './clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  cliente: Cliente = {
    id: 0,
    nome: '',
    link: '',
    foto: ''
  }

  url: string = environment.apiUrl
  listaClientes: Cliente[] = []

  constructor(
    private service: ClientesService,
    private router: Router
    ) { }


  ngOnInit(): void {
    this.service.listar().subscribe((listaClientes) => {
      this.listaClientes = listaClientes
    })
  }

  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

}
