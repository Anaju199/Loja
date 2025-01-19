import { Cor } from './../../service/tipos';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosFavoritosService } from 'src/app/service/produtos-favoritos.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { Imagem, Produto } from 'src/app/service/tipos';
import { environment } from 'src/environments/environment';
import { UserService } from '../pagamentos/services/user.service';
import { ProdutosCarrinhoService } from 'src/app/service/produtos-carrinho.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  link: string = environment.urlImagem
  produto!: Produto
  imagemSelecionada: any;
  corSelecionada: any = '';
  tamanhoSelecionado: any = '';
  isFavorito: boolean = false;
  userId = this.userService.retornarId();
  quantidade: number = 0;
  favoritoId: number = 0;
  quants: number[] = [];
  produtoValido: boolean = true

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
    this.service.buscarPorId(parseInt(id!)).pipe(
      tap((Produto) => {
        this.produto = Produto;
        this.selecionaImagemInicial();
      }),
      switchMap((Produto) => 
        this.favoritoService.buscarPorClientePorProduto(Produto.id, this.userId)
      )
    ).subscribe((response) => {
      this.isFavorito = response.isFavorito;
      this.favoritoId = response.id; 
    });    

    for (let quant = 1; quant <= 20; quant++) {
      this.quants.push(quant);
    }
  }

  selecionaImagemInicial(): void {
    if (this.produto) {
      this.corSelecionada = this.produto.cores.find((cor: Cor) => cor.inicial);
      if (this.corSelecionada?.imagens) {
        this.imagemSelecionada = this.corSelecionada.imagens.find((foto: Imagem) => foto.inicial) || '';
        this.ordenarImagens();
      } 
    }
  }

  selecionarImagem(fotoProduto: Imagem): void {
    this.imagemSelecionada = fotoProduto;
    this.ordenarImagens();
  }

  selecionarCor(corProduto: Cor): void {
    this.corSelecionada = corProduto;
    if (this.corSelecionada) {
      this.imagemSelecionada = this.corSelecionada.imagens.find((foto: Imagem) => foto.inicial) || '';
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
      if(!this.isFavorito){
        this.isFavorito = !this.isFavorito;
  
        const favoritoData = {
          cliente: this.userId,
          produto: this.produto.id
        };
  
        this.favoritoService.criar(favoritoData).subscribe(
          (response: { id: number }) => {
            this.favoritoId = response.id;
            console.log('Produto adicionado aos favoritos com sucesso. ID:', this.favoritoId);
          },
          (error) => {
            console.error('Erro ao adicionar favorito:', error);
          }
        );        

      } else {
        this.isFavorito = !this.isFavorito;

        if(this.favoritoId > 0) {
          this.favoritoService.excluir(this.favoritoId).subscribe(() => {
            console.log('Produto removido dos favoritos com sucesso.')
          })
        }

      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  adicionarCarrinho(): void {
    if(this.userId){
      if(!this.corSelecionada) {
        alert("Selecione a cor")
        this.produtoValido = false
        return;
      }
      
      if(this.tamanhoSelecionado === '') {
        alert("Selecione o tamanho")
        this.produtoValido = false
        return;
      }

      if(this.quantidade === 0) {
        alert("Selecione a quantidade")
        this.produtoValido = false
        return;
      }

      if(this.produtoValido) {
        const carrinhoData = {
          cliente: this.userId,
          produto: this.produto.id,
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
