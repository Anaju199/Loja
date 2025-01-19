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

  isAdmin: boolean = false;
  filtroProduto: string = ''
  listaFiltroProdutos: Produto[] = [];
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  itensPorPagina: number = 10;

  user$ = this.userService.retornarUser();
  nome = this.userService.retornarNome();
  id = this.userService.retornarId();

  constructor(
    private service: ProdutosService,
    private userService: UserService,
    private router: Router
  ) { }

  logout() {
    this.userService.logout();
    window.location.href = '/login'
  }

  ngOnInit(): void {
    const role = this.userService.retornarUserRole();
    this.isAdmin = role === 'admin';
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
