import { Cor } from './../../service/tipos';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosFavoritosService } from 'src/app/service/produtos-favoritos.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { Imagem, Produto } from 'src/app/service/tipos';
import { environment } from 'src/environments/environment';
import { UserService } from '../pagamentos/services/user.service';
import { ProdutosCarrinhoService } from 'src/app/service/produtos-carrinho.service';

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
  isFavorite: boolean = false;
  userId = this.userService.retornarId();
  quantidade: number = 0;
  quants: number[] = [];
  pedidoValido: boolean = true

  constructor(
    private service: ProdutosService,
    private favoritoService: ProdutosFavoritosService,
    private carrinhoService: ProdutosCarrinhoService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((Produto) => {
      this.Produto = Produto
      this.isFavorite = Produto.is_favorito
      this.selecionaImagemInicial();
    })

    for (let quant = 1; quant <= 20; quant++) {
      this.quants.push(quant);
    }
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

  adicionarFavorito(): void {
    if(this.userId){
      this.isFavorite = !this.isFavorite;

      const favoritoData = {
        cliente: this.userId,
        produto: this.Produto.id
      };

      this.favoritoService.criar(favoritoData).subscribe(
        () => {
          console.log('Produto adicionado aos favoritos com sucesso.');
        },
        error => {
          console.error('Erro ao adicionar favorito:', error);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  adicionarCarrinho(): void {
    if(this.userId){
      if(this.tamanhoSelecionado === '') {
        alert("Selecione o tamanho")
        this.pedidoValido = false
      }

      if(this.quantidade === 0) {
        alert("Selecione a quantidade")
        this.pedidoValido = false
      }

      if(this.pedidoValido) {
        const carrinhoData = {
          cliente: this.userId,
          produto: this.Produto.id,
          cor: this.corSelecionada.id,
          tamanho: this.tamanhoSelecionado.id,
          quantidade: this.quantidade
        };

        this.carrinhoService.criar(carrinhoData).subscribe(
          () => {
            alert("Produto adicionado ao carrinho")
          },
          error => {
            console.error(error);
            alert("Erro ao adicionar produto ao carrinho")
          }
        );
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  comprar() {
    this.router.navigate(['/pedido']);
  }

}
