import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoresProdutosService } from 'src/app/service/cores-produtos.service';
import { ProdutosService } from 'src/app/service/produtos.service';
import { Cor } from 'src/app/service/tipos';

@Component({
  selector: 'app-cadastrar-cores-produto',
  templateUrl: './cadastrar-cores-produto.component.html',
  styleUrls: ['./cadastrar-cores-produto.component.css']
})
export class CadastrarCoresProdutoComponent implements OnInit {

  id?: number
  formulario!: FormGroup;
  titulo: string = 'Adicione uma novo cor possivel para ' 
  produtoId: number = 0;
  descricao: string = '';
  cores: Cor[] = []

  constructor(
    private service: CoresProdutosService,
    private produtoService: ProdutosService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.produtoId = this.route.snapshot.params['id'];

    this.route.queryParams.subscribe(params => {
      this.descricao = params['descricao'];
    });

    this.formulario = this.formBuilder.group({
      id: [],
      cores: [''],
      produto: [this.produtoId, Validators.required],
      cor: ['', Validators.required],
      inicial: [true]
    });

    this.produtoService.buscarPorId(this.produtoId).subscribe((produto) => {
      this.cores = produto.cores
    })

  }

  onCorSelecionada(event: Event) {
    const target = event.target as HTMLSelectElement; // Casting para HTMLSelectElement
    const corId = target.value; // Acessa o valor do select
  
    if (corId) {
      this.service.buscarPorId(parseInt(corId)).subscribe((corProduto) => {
        this.id = corProduto.id;
        this.formulario.patchValue({
          id: corProduto.id,
          cor: corProduto.cor,
          inicial: corProduto.inicial
        });
      });
    } else {
      // Reseta o formulário se nenhuma cor for selecionada
      this.formulario.reset({
        cores: '',
        produto: this.produtoId,
        cor: '',
        inicial: true
      });
      this.id = undefined;
    }
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

  editarCor(destino: string) {
    if(this.formulario.valid){
      this.service.editar(this.formulario.value).subscribe(() => {
        alert('Cor editada com sucesso.')
        switch(destino) {
          case 'cadastrarEditarCores':
            this.router.navigate(['/cadastrarEditarCores', this.produtoId], { queryParams: { descricao: this.descricao }}).then(() => {
              this.recarregarComponente();
            });
            break;
          default:
            this.router.navigate(['/produtos']); // rota padrão
        }
      })
    }
  }

  criarCor(destino: string) {
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(() => {
        alert('Cor cadastrada com sucesso.')
        switch(destino) {
          case 'produtos':
            this.router.navigate(['/produtos']);
            break;
          case 'cadastrarEditarFotos':
            this.router.navigate(['/cadastrarEditarFotos', this.produtoId], { queryParams: { descricao: this.descricao }});
            break;
          case 'cadastrarEditarCores':
            this.router.navigate(['/cadastrarEditarCores', this.produtoId], { queryParams: { descricao: this.descricao }}).then(() => {
              this.recarregarComponente();
            });
            break;
          default:
            this.router.navigate(['/produtos']); // rota padrão
        }
      }, error => {
        console.log(error)
        alert('Não foi possivel cadastrar. Verifique se essa cor já não foi cadastrado para esse produto.')
      });
    } else {
      alert('Formulário Inválido')
    }
  }

  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/cadastrarEditarCores', this.produtoId], { 
      queryParams: { descricao: this.descricao } 
    });
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
        alert('Cor excluida com sucesso.')
        this.recarregarComponente()
      })
    }
  }
}
