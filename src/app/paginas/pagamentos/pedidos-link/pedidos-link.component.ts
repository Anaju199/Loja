import { Component, OnInit } from '@angular/core';
import { Pedido } from '../tipos';
import { PedidoService } from '../services/pedido.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pedidos-link',
  templateUrl: './pedidos-link.component.html',
  styleUrls: ['./pedidos-link.component.css']
})
export class PedidosLinkComponent implements OnInit {

  listaPedido: Pedido[] = [];
  paginaAtual: number = 1;
  haMaisPesamentos: boolean = true;
  nome!: string | null;

  constructor(
    private service: PedidoService,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    const id = this.userService.retornarId();
    if(id){
      this.service.listar(id).subscribe((listaPedidos) => {
        this.listaPedido = listaPedidos
      })
    }
    else{
      alert('Ocorreu um erro ao listar os pedidos. Tente novamente mais tarde')
    }
  }

  temPagamento(event: Event, link: string){
    if(link === ''){
      alert('Não há link para pagamento, favor entrar em contato com administrador.');
      event.preventDefault(); // Previne o redirecionamento
    }
  }

}
