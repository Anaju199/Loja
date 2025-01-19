import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() isFavorito: boolean = false;

  link: string = environment.urlImagem
  imagensIniciais: any[] = [];

  constructor(
    private service: ProdutosService
  ) { }

    ngOnInit(): void {
      this.service.produtosFiltrados$.subscribe(produtos => {
        this.listaProdutos = produtos;
        this.selecionaImagemInicial();
      });
    }

    ngOnChanges(changes: SimpleChanges): void {
      this.selecionaImagemInicial();
    }

    selecionaImagemInicial(): void {
      this.imagensIniciais = this.listaProdutos.map(produto => {
        const corInicial = produto.cores.find(cor => cor.inicial);
        if (corInicial) {
          const imagemInicial = corInicial.imagens.find(foto => foto.inicial);
          return imagemInicial ? imagemInicial : null;
        }
        return null;
      });
    }

}
