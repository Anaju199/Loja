import { Cor } from './../../service/tipos';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from 'src/app/service/produtos.service';
import { Imagem, Produto } from 'src/app/service/tipos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  link: string = environment.apiUrl
  Produto!: Produto
  imagemSelecionada: any;
  corSelecionada: any;
  tamanhoSelecionado: any;

  constructor(
    private service: ProdutosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((Produto) => {
      this.Produto = Produto
      this.selecionaImagemInicial();
    })
  }

  selecionaImagemInicial(): void {
    if (this.Produto) {
      this.corSelecionada = this.Produto.cores.find((cor: Cor) => cor.inicial);
      if (this.corSelecionada) {
        this.imagemSelecionada = this.corSelecionada.imagens.find((imagem: Imagem) => imagem.inicial);
      }
    }
    this.ordenarImagens();
  }

  selecionarImagem(fotoProduto: Imagem): void {
    this.imagemSelecionada = fotoProduto;
    this.ordenarImagens();
  }

  selecionarCor(corProduto: Cor): void {
    this.corSelecionada = corProduto;
    if (this.corSelecionada) {
      this.imagemSelecionada = this.corSelecionada.imagens.find((imagem: Imagem) => imagem.inicial);
    }
    // this.selecionaImagemInicial();
  }

  selecionarTamanho(tamanho: any): void {
    this.tamanhoSelecionado = tamanho;
  }

  ordenarImagens(): void {
    if (this.corSelecionada && this.corSelecionada.imagens) {
      this.corSelecionada.imagens = this.corSelecionada.imagens.sort((a: any, b: any) => {
        if (a === this.imagemSelecionada) return -1;
        if (b === this.imagemSelecionada) return 1;
        if (a.inicial && !b.inicial) return -1;
        if (!a.inicial && b.inicial) return 1;
        return 0;
      });
    }
  }
}
