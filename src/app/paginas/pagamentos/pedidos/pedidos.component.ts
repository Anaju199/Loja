import { Component, OnInit } from '@angular/core';
import { Pedido, Usuario } from '../tipos';
import { PedidoService } from '../services/pedido.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CadastroService } from '../services/cadastro.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  listaPedido: Pedido[] = [];
  paginaAtual: number = 1;
  haMaisPesamentos: boolean = true;
  nome!: string | null;
  selectedIds: number[] = [];

  constructor(
    private service: PedidoService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('pedido')

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

  carregarMaisPedidos(){
    this.service.listarTodos()
    .subscribe(listaPedidos => {
      this.listaPedido.push(...listaPedidos);
      if(!listaPedidos.length){
        this.haMaisPesamentos = false
      }
    })
  }

  onCheckboxChange(id: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedIds.push(id);
    } else {
      const index = this.selectedIds.indexOf(id);
      if (index > -1) {
        this.selectedIds.splice(index, 1);
      }
    }
  }

  pagar() {
    if (this.selectedIds.length > 0) {
      this.router.navigate(['/confirmarPagamentos'], { queryParams: { ids: this.selectedIds.join(',') } });
    } else {
      alert('Por favor, selecione pelo menos um pagamento para continuar.');
    }
  }


  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir?')){
      this.service.excluir(id).subscribe(() => {
        alert('Pedido excluido com sucesso.')
        this.recarregarComponente()
      })
    }
  }

  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

}
