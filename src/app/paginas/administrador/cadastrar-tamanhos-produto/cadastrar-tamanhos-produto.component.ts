import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from 'src/app/service/produtos.service';
import { TamanhosProdutoService } from 'src/app/service/tamanhos-produto.service';
import { Tamanho } from 'src/app/service/tipos';

@Component({
  selector: 'app-cadastrar-tamanhos-produto',
  templateUrl: './cadastrar-tamanhos-produto.component.html',
  styleUrls: ['./cadastrar-tamanhos-produto.component.css']
})
export class CadastrarTamanhosProdutoComponent implements OnInit {

  id?: number
  formulario!: FormGroup;
  titulo: string = 'Adicione um novo tamanho possivel para '
  produtoId: number = 0;
  descricao: string = '';
  tamanhos: Tamanho[] = []

  constructor(
    private service: TamanhosProdutoService,
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
      tamanhos: [''],
      id: [],
      produto: [this.produtoId, Validators.required],
      tamanho: ['', Validators.required]
    });

    this.produtoService.buscarPorId(this.produtoId).subscribe((produto) => {
      this.tamanhos = produto.tamanhos
    })
  }

  onTamanhoSelecionado(event: Event) {
    const target = event.target as HTMLSelectElement; // Casting para HTMLSelectElement
    const tamanhoId = target.value; // Acessa o valor do select
  
    if (tamanhoId) {
      // this.btnFotosProd = 'Editar fotos do produto'
      this.service.buscarPorId(parseInt(tamanhoId)).subscribe((tamanhoProduto) => {
        this.id = tamanhoProduto.id;
        this.formulario.patchValue({
          id: tamanhoProduto.id,
          tamanho: tamanhoProduto.tamanho
        });
      });
    } else {
      // Reseta o formulário se nenhuma tamanho for selecionada
      // this.btnFotosProd = 'Adicionar fotos do produto'
      this.formulario.reset({
        tamanhos: '',
        produto: this.produtoId,
        tamanho: '',
        inicial: false
      });
      this.id = undefined;
    }
  }

  editarTamanho(destino: string) {
    console.log('edit')
    if(this.formulario.valid){
      this.service.editar(this.formulario.value).subscribe(() => {
        alert('Tamanho editado com sucesso.')
        switch(destino) {
          case 'produtos':
            this.router.navigate(['/produtos']);
            break;
          case 'cadastrarEditarImagens':
            this.router.navigate(['/cadastrarEditarImagens']);
            break;
          case 'cadastrarEditarTamanho':
            this.router.navigate(['/cadastrarEditarTamanho', this.produtoId], { queryParams: { descricao: this.descricao }}).then(() => {
              this.recarregarComponente();
            });
            break;
          case 'cadastrarEditarCores':
            this.router.navigate(['/cadastrarEditarCores', this.produtoId], { queryParams: { descricao: this.descricao }});
            break;
          case 'cadastrarEditarDisponibilidade':
            this.router.navigate(['/cadastrarEditarDisponibilidade', this.produtoId], { queryParams: { descricao: this.descricao }});
            break;
          default:
            this.router.navigate(['/produtos']); // rota padrão
        }
      })
    }
  }

  criarTamanho(destino: string) {
    console.log('cria')
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(() => {
        alert('Tamanho cadastrado com sucesso.')
        switch(destino) {
          case 'produtos':
            this.router.navigate(['/produtos']);
            break;
          case 'cadastrarEditarFotos':
            this.router.navigate(['/cadastrarEditarFotos', this.produtoId], { queryParams: { descricao: this.descricao }});
            break;
          case 'cadastrarEditarTamanho':
            this.router.navigate(['/cadastrarEditarTamanho', this.produtoId], { queryParams: { descricao: this.descricao }}).then(() => {
              this.recarregarComponente();
            });
            break;
          case 'cadastrarEditarCores':
            this.router.navigate(['/cadastrarEditarCores', this.produtoId], { queryParams: { descricao: this.descricao }});
            break;
          case 'cadastrarEditarDisponibilidade':
            this.router.navigate(['/cadastrarEditarDisponibilidade', this.produtoId], { queryParams: { descricao: this.descricao }});
            break;
          default:
            this.router.navigate(['/produtos']); // rota padrão
        }
      }, error => {
        console.log(error)
        alert('Não foi possivel cadastrar. Verifique se essa tamanho já não foi cadastrado para esse produto.')
      });
    } else {
      alert('Formulário Inválido')
    }
  }

  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/cadastrarEditarTamanho', this.produtoId], {
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
        alert('Cor excluida com sucesso.')
        this.recarregarComponente()
      })
    }
  }
}
