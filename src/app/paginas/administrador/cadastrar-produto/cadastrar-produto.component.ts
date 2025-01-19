import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from 'src/app/service/produtos.service';
import { Cor, Tamanho } from 'src/app/service/tipos';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {

  id?: number
  formulario!: FormGroup;
  classes: string[] = [];
  ano: number = new Date().getFullYear()
  titulo: string = 'Adicione um novo produto:'
  btnCores: string = 'Adicionar opções de cores'
  cores: Cor[] = [];
  tamanhos: Tamanho[] = [];

  exibirCores: boolean = false;
  exibirTamanhos: boolean = false;

  constructor(
    private service: ProdutosService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      id: [],
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
      palavras_chave: ['']
    });

    const id = this.route.snapshot.paramMap.get('id')

    if(id){
      this.titulo = 'Editar informações do produto:'
      this.btnCores = 'Editar cores'

      this.service.buscarPorId(parseInt(id!)).subscribe((produto) => {
        this.id  = produto.id
        this.formulario = this.formBuilder.group({
          id: [produto.id],
          descricao: [produto.descricao,Validators.compose([
            Validators.required
          ])],
          valor: [produto.valor,Validators.compose([
            Validators.required
          ])],
          palavras_chave: [produto.palavras_chave]
        })

        this.cores = produto.cores
        this.tamanhos = produto.tamanhos
      })

    }
  }

  toggleExibir(section: string) {
    if (section === 'cores') {
      this.exibirCores = !this.exibirCores;
    } else if (section === 'tamanhos') {
      this.exibirTamanhos = !this.exibirTamanhos;
    }
  }

  caminho(destino: string) {
    const produtoId = this.id;
    const descricao = this.formulario.value.descricao;
    switch(destino) {
      case 'produtos':
        this.router.navigate(['/produtos']);
        break;
      case 'cadastrarEditarFotos':
        this.router.navigate(['/cadastrarEditarFotos', produtoId], { queryParams: { descricao: descricao } });
        break;
      case 'cadastrarEditarProduto':
        this.router.navigate(['/cadastrarEditarProduto', produtoId], { queryParams: { descricao: descricao } });
        break;
      case 'cadastrarEditarCores':
        this.router.navigate(['/cadastrarEditarCores', produtoId], { queryParams: { descricao: descricao } });
        break;
      case 'cadastrarEditarTamanho':
        this.router.navigate(['/cadastrarEditarTamanho', produtoId], { queryParams: { descricao: descricao } });
        break;
      case 'cadastrarEditarDisponibilidade':
        this.router.navigate(['/cadastrarEditarDisponibilidade', produtoId], { queryParams: { descricao: descricao } });
        break;
      case 'cadastrarEditarCategoriaProduto':
        this.router.navigate(['/cadastrarEditarCategoriaProduto', produtoId], { queryParams: { descricao: descricao } });
        break;
      default:
        this.router.navigate(['/produtos']); // rota padrão
    }
  }

  editarProduto(destino: string) {
    if(this.formulario.valid){
      this.service.editar(this.formulario.value).subscribe((response: any) => {
        const produtoId = this.id;
        const descricao = this.formulario.value.descricao;
        switch(destino) {
          case 'cadastrarEditarProduto':
              this.router.navigate(['/cadastrarEditarProduto', produtoId], { queryParams: { descricao: descricao }}).then(() => {
                this.recarregarComponente();
              });
            break;
          default:
            this.router.navigate(['/produtos']); // rota padrão
        }
      }, error => {
        alert('Erro ao editar.')
        console.log('erro: ', error)
      });
    }
  }

  criarProduto(destino: string) {
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe((response: any) => {
        const produtoId = this.id;
        const descricao = this.formulario.value.descricao;

        switch(destino) {
          case 'produtos':
            alert('Produto cadastrado com sucesso.')
            this.router.navigate(['/produtos']);
            break;
          case 'cadastrarEditarProduto':
              this.router.navigate(['/cadastrarEditarProduto', produtoId], { queryParams: { descricao: descricao }}).then(() => {
                this.recarregarComponente();
              });
              break;
          default:
            this.router.navigate(['/produtos']); // rota padrão
        }
      }, error => {
        alert('Não foi possivel cadastrar. Verifique se esse produto já não foi cadastrado.')
      });
    } else {
      alert('Formulário Inválido')
    }
  }

  listarProdutos() {
    this.router.navigate(['/produtos'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao_forms'
    } else {
      return 'botao__desabilitado'
    }
  }

  recarregarComponente(){
    const produtoId = this.id;
    const descricao = this.formulario.value.descricao;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/cadastrarEditarProduto', produtoId], {
      queryParams: { descricao: descricao }
    });
  }

}
