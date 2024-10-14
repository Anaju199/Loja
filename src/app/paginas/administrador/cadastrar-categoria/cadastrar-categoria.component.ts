import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaProdutoService } from 'src/app/service/categoria-produto.service';
import { CategoriasParaProdutoService } from 'src/app/service/categorias-para-produto.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { Categoria, Produto } from 'src/app/service/tipos';

@Component({
  selector: 'app-cadastrar-categoria',
  templateUrl: './cadastrar-categoria.component.html',
  styleUrls: ['./cadastrar-categoria.component.css']
})
export class CadastrarCategoriaComponent implements OnInit {

  id?: number
  formulario!: FormGroup;
  categorias: Categoria[] = [];
  titulo: string = 'Adicione um nova categoria para '
  produtoId: number = 0;
  descricao: string = '';

  constructor(
    private service: CategoriasParaProdutoService,
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
      categoriasCadastradas: [''],
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

    this.service.listar().subscribe(
      categorias => {
        this.categorias = categorias;
      },
      error => {
        console.error('Erro ao recuperar categorias:', error);
      }
    );
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
          case 'cadastrarEditarCategorias':
            this.router.navigate(['/cadastrarEditarCategorias']);
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
          case 'cadastrarEditarCategorias':
            this.router.navigate(['/cadastrarEditarCategorias']).then(() => {
              this.recarregarComponente();
            });
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
    this.router.navigate(['/cadastrarEditarCategorias']);
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

}
