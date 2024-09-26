import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FotosProdutoService } from 'src/app/service/fotos-produtos.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { Cor, Imagem, Produto } from 'src/app/service/tipos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {

  @Input() listaProdutos: Produto[] = []

  link: string = environment.apiUrl
  listaImagens: Imagem [] = [];
  corPrincipal: Cor[] = [];
  imagensIniciais: any[] = [];
  nome: string = ''
  ano: number = new Date().getFullYear()

  constructor(
    private router: Router,
    private service: ProdutosService
  ) { }

    ngOnInit(): void {
      this.service.produtosFiltrados$.subscribe(produtos => {
        this.listaProdutos = produtos;
      });
    }

    ngOnChanges(changes: SimpleChanges): void {
      this.selecionaImagemInicial();
    }

    selecionaImagemInicial(): void {
      this.imagensIniciais = this.listaProdutos.map(produto => {
        const corInicial = produto.cores.find(cor => cor.inicial);
        if (corInicial) {
          const imagemInicial = corInicial.imagens.find(imagem => imagem.inicial);
          return imagemInicial ? imagemInicial : null;
        }
        return null;
      });
    }

    recarregarComponente(){
      this.router.routeReuseStrategy.shouldReuseRoute = () => false
      this.router.onSameUrlNavigation = 'reload'
      this.router.navigate([this.router.url])
    }

}
