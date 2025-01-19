import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaProdutoService } from 'src/app/service/categoria-produto.service';
import { CategoriasParaProdutoService } from 'src/app/service/categorias-para-produto.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { Categoria, Produto } from 'src/app/service/tipos';

@Component({
  selector: 'app-cadastrar-categoria-produto',
  templateUrl: './cadastrar-categoria-produto.component.html',
  styleUrls: ['./cadastrar-categoria-produto.component.css']
})
export class CadastrarCategoriaProdutoComponent implements OnInit {

  id?: number
  formulario!: FormGroup;
  categorias: Categoria[] = [];
  titulo: string = 'Adicione um nova categoria para '
  produtoId: number = 0;
  descricao: string = '';

  constructor(
    private service: CategoriaProdutoService,
    private categoriaService: CategoriasParaProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.produtoId = this.route.snapshot.params['id'];

    this.route.queryParams.subscribe(params => {
      this.descricao = params['descricao'];
    });

    console.log('iddd',this.produtoId)
    this.formulario = this.formBuilder.group({
      id: [],
      produto: [this.produtoId, Validators.required],
      categoria: ['', Validators.required]
    });

    // const id = this.route.snapshot.paramMap.get('id')

    // if(id){
    //   this.titulo = 'Editar tamanho do produto:'

    //   this.service.buscarPorId(parseInt(id!)).subscribe((tamanhoProduto) => {
    //     this.id  = tamanhoProduto.id
    //     this.formulario = this.formBuilder.group({
    //       id: [tamanhoProduto.id],
    //       classe: [tamanhoProduto.produto,Validators.compose([
    //         Validators.required
    //       ])],
    //       professores: [tamanhoProduto.tamanho,Validators.compose([
    //         Validators.required
    //       ])],
    //       palavras_chave: [tamanhoProduto.inicial]
    //     })
    //   })
    // }

    this.categoriaService.listar().subscribe(
      categorias => {
        this.categorias = categorias;
      },
      error => {
        console.error('Erro ao recuperar categorias:', error);
      }
    );
  }

  caminho(destino: string) {
    switch(destino) {
      case 'produtos':
        this.router.navigate(['/produtos']);
        break;
      case 'cadastrarEditarFotos':
        this.router.navigate(['/cadastrarEditarFotos', this.produtoId], { queryParams: { descricao: this.descricao } });
        break;
      case 'cadastrarEditarProduto':
        this.router.navigate(['/cadastrarEditarProduto', this.produtoId], { queryParams: { descricao: this.descricao } });
        break;
      case 'cadastrarEditarCores':
        this.router.navigate(['/cadastrarEditarCores', this.produtoId], { queryParams: { descricao: this.descricao } });
        break;
      case 'cadastrarEditarTamanho':
        this.router.navigate(['/cadastrarEditarTamanho', this.produtoId], { queryParams: { descricao: this.descricao } });
        break;
      case 'cadastrarEditarDisponibilidade':
        this.router.navigate(['/cadastrarEditarDisponibilidade', this.produtoId], { queryParams: { descricao: this.descricao } });
        break;
      case 'cadastrarEditarCategoriaProduto':
        this.router.navigate(['/cadastrarEditarCategoriaProduto', this.produtoId], { queryParams: { descricao: this.descricao } });
        break;
      default:
        this.router.navigate(['/produtos']); // rota padrão
    }
  }

  editarCategoria(destino: string) {
    if(this.formulario.valid){
      this.service.editar(this.formulario.value).subscribe(() => {
        alert('Categoria editada com sucesso.')
        switch(destino) {
          case 'produtos':
            this.router.navigate(['/produtos']);
            break;
          case 'cadastrarEditarImagens':
            this.router.navigate(['/cadastrarEditarImagens']);
            break;
          case 'cadastrarEditarCategoriaProduto':
            this.router.navigate(['/cadastrarEditarCategoriaProduto']);
            break;
          default:
            this.router.navigate(['/produtos']); // rota padrão
        }
      })
    }
  }

  criarCategoria(destino: string) {
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(() => {
        alert('Categoria cadastrada com sucesso.')
        switch(destino) {
          case 'produtos':
            this.router.navigate(['/produtos']);
            break;
          case 'cadastrarEditarFotos':
            this.router.navigate(['/cadastrarEditarFotos', this.produtoId], { queryParams: { descricao: this.descricao }});
            break;
          case 'cadastrarEditarCategoriaProduto':
            this.router.navigate(['/cadastrarEditarCategoriaProduto', this.produtoId], { queryParams: { descricao: this.descricao }}).then(() => {
              this.recarregarComponente();
            });
            break;
          case 'cadastrarEditarTamanho':
            this.router.navigate(['/cadastrarEditarTamanho', this.produtoId], { queryParams: { descricao: this.descricao }});
            break;
          case 'cadastrarEditarCategoria':
            this.router.navigate(['/cadastrarEditarCategoria', this.produtoId], { queryParams: { descricao: this.descricao }});
            break;
          case 'cadastrarEditarCores':
            this.router.navigate(['/cadastrarEditarCores', this.produtoId], { queryParams: { descricao: this.descricao }});
            break;
          default:
            this.router.navigate(['/produtos']); // rota padrão
        }
      }, error => {
        console.log(error)
        alert('Não foi possivel cadastrar. Verifique se essa Categoria já não foi cadastrado para esse produto.')
      });
    } else {
      alert('Formulário Inválido')
    }
  }

  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/cadastrarEditarCategoriaProduto', this.produtoId], {
      queryParams: { descricao: this.descricao }
    });
  }

  cancelar() {
    this.router.navigate(['/produtos'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao_forms'
    } else {
      return 'botao__desabilitado'
    }
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir?')){
      this.service.excluir(id).subscribe(() => {
        alert('Categoria excluida com sucesso.')
        this.recarregarComponente()
      })
    }
  }

}
