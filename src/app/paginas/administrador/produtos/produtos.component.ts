import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutosService } from 'src/app/service/produtos.service';
import { Produto } from 'src/app/service/tipos';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  listaProduto: Produto[] = [];
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  itensPorPagina: number = 10;
  filtroProduto: string = ''

  constructor(
    private service: ProdutosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarProdutos()
  }

  carregarProdutos(){
    this.service.listarTodos(this.paginaAtual, this.itensPorPagina).subscribe((response) => {
      this.listaProduto = response.results
      this.totalPaginas = Math.ceil(response.count/this.itensPorPagina)
    })
  }

  temImagens(produto: Produto): boolean {
    return produto.cores.some(cor => cor.imagens && cor.imagens.length > 0);
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarProdutos();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarProdutos();
    }
  }

  habilitarBotao(direcao: string): string {
    if (direcao === 'anterior' && this.paginaAtual === 1) {
      return 'botao_pag_desabilitado';
    }
    if (direcao === 'proxima' && this.paginaAtual === this.totalPaginas) {
      return 'botao_pag_desabilitado';
    }
    return 'botao_pag';
  }


  voltar() {
    this.router.navigate(['/administrador'])
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir?')){
      this.service.excluir(id).subscribe(() => {
        alert('Produto excluido com sucesso.')
        this.recarregarComponente()
      })
    }
  }

  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  pesquisarProduto(){
    this.service.listar(this.filtroProduto)
      .subscribe(listaTodosProdutos => {
        this.listaProduto = listaTodosProdutos;
      });
  }
}
