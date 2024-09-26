import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/paginas/pagamentos/services/user.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { Produto } from 'src/app/service/tipos';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  filtroProduto: string = ''
  listaFiltroProdutos: Produto[] = [];
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  itensPorPagina: number = 10;

  constructor(
    private service: ProdutosService,
    private userService: UserService,
    private router: Router
  ) { }

  user$ = this.userService.retornarUser();

  logout() {
    this.userService.logout();
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
  }

  pesquisarProduto(){
    this.service.listarPesquisa(this.filtroProduto, this.paginaAtual, this.itensPorPagina)
      .subscribe(listaFiltroProdutos => {
        this.listaFiltroProdutos = listaFiltroProdutos
    })

    // const produtosFiltrados = this.listaFiltroProdutos.filter(produto =>
    //   produto.descricao.toLowerCase().includes(this.filtroProduto.toLowerCase())
    // );
    this.service.setProdutosFiltrados(this.listaFiltroProdutos);
    this.router.navigate(['/listaProdutos']);
  }

  pesquisar(){
    this.router.navigate(['/listaProdutos/'+ this.filtroProduto])
  }
}
