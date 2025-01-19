import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutosCarrinhoService } from 'src/app/service/produtos-carrinho.service';
import { Carrinho } from 'src/app/service/tipos';
import { environment } from 'src/environments/environment';
import { UserService } from '../pagamentos/services/user.service';
import { PedidoService } from '../pagamentos/services/pedido.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  link: string = environment.urlImagem
  listaProdutosCarrinho: Carrinho[] = []
  userId = this.userService.retornarId();
  quants: number[] = [];
  selectAllChecked: boolean = false;
  itemPedidoOK: boolean = false;
  pedidoId: number = 0;

  constructor(
    private router: Router,
    private service: ProdutosCarrinhoService,
    private pedidoService: PedidoService,
    private userService: UserService
  ) { }

    ngOnInit(): void {
      this.pedidoService.removePedido();
      
      this.service.listar(this.userId).subscribe((listaProdutosCarrinho) => {
        this.listaProdutosCarrinho = listaProdutosCarrinho
        this.selecionaImagemInicial()
      })

      for (let quant = 1; quant <= 20; quant++) {
        this.quants.push(quant);
      }
    }

    selecionaImagemInicial(): void {
      this.listaProdutosCarrinho.forEach(produto => {
        const corInicial = produto.cor_selecionada;
        if (corInicial) {
          const imagemInicial = corInicial.imagens.find(foto => foto.inicial);
          produto.foto = imagemInicial?.foto || null; 
        } else {
          produto.foto = null; 
        }
      });
    }

    toggleSelectAll(): void {
      this.listaProdutosCarrinho.forEach(produto => {
        produto.selecionado = this.selectAllChecked;
      });
    }
  
    updateSelectAllStatus(): void {
      this.selectAllChecked = this.listaProdutosCarrinho.every(produto => produto.selecionado);
    }

    excluir(id: number) {
      if (confirm('Tem certeza que deseja excluir?')){
        this.service.excluir(id).subscribe(() => {
          alert('Item excluido com sucesso do carrinho.')
          this.recarregarComponente()
        })
      }
    }
  
    recarregarComponente(){
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.router.onSameUrlNavigation = 'reload'
      this.router.navigate([this.router.url])
    }

    comprar() {
      if(this.quantiSelecionada === 0) {
        alert("Selecione ao menos um item.")
        return;
      }

      const pedidoData = {
        cliente: this.userId,
        status: 'Aberto',
        quant_itens: this.quantiSelecionada,
        valor: this.getTotalSelecionado(),
        data_pgt: '1900-01-01'
      };

      this.pedidoService.criar(pedidoData).subscribe(
        (response: { id: number }) => {
          this.pedidoId = response.id;
          console.log('Pedido adicionado com sucesso. ID:', this.pedidoId);
      
          // Executar o forEach após o pedidoId ser definido
          this.listaProdutosCarrinho
            .filter(produto => produto.selecionado)
            .forEach(produto => {
              const itemPedidoData = {
                pedido: this.pedidoId, // Agora o ID está disponível
                produto_id: produto.produto_id,
                descricao: produto.descricao || '',
                valor: produto.valor || 0,
                cor: produto.cor_selecionada?.cor || '',
                tamanho: produto.tamanho_selecionado?.tamanho || '',
                quantidade: produto.quantidade || 1,
                foto: produto.foto || '',
              };
      
              // console.log(itemPedidoData);
      
              this.pedidoService.criarItemPedido(itemPedidoData).subscribe(
                () => {
                  this.itemPedidoOK = true
                  console.log('Item do pedido adicionado com sucesso.');
                },
                (error) => {
                  this.itemPedidoOK = false
                  console.error('Erro ao adicionar item do pedido:', error);
                }
              );

              // setTimeout(() => {
              //   if (this.itemPedidoOK) {
              //     this.service.excluir(produto.id).subscribe(() => {
              //       console.log('Item removido do carrinho')
              //     })
              //   }
              // }, 2000);
            });

            setTimeout(() => {
              if (this.itemPedidoOK) {
                this.router.navigate(['/confirmarPagamentos', this.pedidoId]);
              } else {
                alert('Erro ao realizar o pedido. Entre em contato com o administrador');
              }  
            }, 2000); // 2000 milissegundos = 2 segundos
        },
        (error) => {
          console.error('Erro ao adicionar pedido:', error);
        }
      );
    }
    
    getTotalSelecionado(): number {
      const produtosSelecionados = this.listaProdutosCarrinho.filter(produto => produto.selecionado);
      return produtosSelecionados.reduce((total, produto) => total + produto.valor * produto.quantidade, 0);
    }

    get quantiSelecionada(): number {
      return this.listaProdutosCarrinho.filter(p => p.selecionado).length;
    }

    get textoSelecionados(): string {
      return `${this.quantiSelecionada} item${this.quantiSelecionada === 1 ? '' : 's'} selecionado${this.quantiSelecionada === 1 ? '' : 's'}`;
    }    

    atualizarQuantidade(produto: any, event: Event): void {
      const target = event.target as HTMLSelectElement;
      const novaQuantidade = Number(target.value);
      
      const dadosAtualizados = {
        id: produto.id,
        cliente: this.userId,
        produto: produto.produto_id,
        cor: produto.cor_selecionada.cor_id,
        tamanho: produto.tamanho_selecionado.id,
        quantidade: novaQuantidade,
      };

      this.service.editar(dadosAtualizados).subscribe(
        () => {
          produto.quantidade = novaQuantidade; // Atualiza localmente a quantidade
          this.getTotalSelecionado(); // Recalcula a soma dos selecionados
          console.log('Quantidade atualizada com sucesso.');
        },
        (erro) => {
          console.error(erro);
          console.log('Erro ao atualizar a quantidade.');
        }
      );
    }
    
}
