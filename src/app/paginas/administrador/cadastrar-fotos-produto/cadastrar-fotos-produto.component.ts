import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoresProdutosService } from 'src/app/service/cores-produtos.service';
import { FotosProdutoService } from 'src/app/service/fotos-produtos.service';
import { Cor, Imagem } from 'src/app/service/tipos';

@Component({
  selector: 'app-cadastrar-fotos-produto',
  templateUrl: './cadastrar-fotos-produto.component.html',
  styleUrls: ['./cadastrar-fotos-produto.component.css']
})
export class CadastrarFotosProdutoComponent implements OnInit {

  id?: number
  formulario!: FormGroup;
  cores: Cor[] = [];
  titulo: string = 'Adicione uma nova foto para '
  produtoId: number = 0;
  descricao: string = '';
  fotos: Imagem[] = []

  constructor(
    private service: FotosProdutoService,
    private corService: CoresProdutosService,
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
      fotos: '',
      produto: [this.produtoId, Validators.required],
      cor: ['', Validators.required],
      foto: [null, Validators.required],
      inicial: [true]
    });

    this.corService.listar(this.produtoId).subscribe(
      cores => {
        this.cores = cores;
      },
      error => {
        console.error('Erro ao recuperar cores:', error);
      }
    );

  }

  caminho(destino: string) {
    switch(destino) {
      case 'produtos':
        this.router.navigate(['/produtos']);
        break;
      case 'cadastrarEditarFotos':
        this.router.navigate(['/cadastrarEditarFotos', this.produtoId], { queryParams: { descricao: this.descricao } }).then(() => {
          this.recarregarComponente();
        });
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

  onCorSelecionada(event: Event) {
    const target = event.target as HTMLSelectElement; // Casting para HTMLSelectElement
    const corSelecionada = Number(target.value); // Acessa o valor do select
  
    if (corSelecionada) {
      const corObjeto = this.cores.find(cor => cor.id === corSelecionada);
      if (corObjeto) {
        this.fotos = corObjeto.imagens;
      }
    } else {
      this.formulario.reset({
        fotos: '',
        produto: this.produtoId,
        foto: '',
        inicial: true
      });
      this.id = undefined;
    }
  }  

  onFotoSelecionada(event: Event) {
    const target = event.target as HTMLSelectElement; // Casting para HTMLSelectElement
    const fotoId = target.value; // Acessa o valor do select
  
    if (fotoId) {
      // this.btnFotosProd = 'Editar fotos do produto'
      this.service.buscarPorId(parseInt(fotoId)).subscribe((fotoProduto) => {
        this.id = fotoProduto.id;
        this.formulario.patchValue({
          id: fotoProduto.id,
          foto: fotoProduto.foto,
          inicial: fotoProduto.inicial
        });
      });
    } else {
      // Reseta o formulário se nenhuma foto for selecionada
      // this.btnFotosProd = 'Adicionar fotos do produto'
      this.formulario.reset({
        fotos: '',
        produto: this.produtoId,
        foto: '',
        inicial: true
      });
      this.id = undefined;
    }
  }  

  editarFoto(destino: string) {
    if(this.formulario.valid){
      const formData = new FormData();
      formData.append('produto', this.formulario.get('produto')!.value);
      formData.append('inicial', this.formulario.get('inicial')!.value);
      formData.append('cor', this.formulario.get('cor')!.value);

      const foto = this.formulario.get('foto')!.value;
      if (foto instanceof File) {
        formData.append('foto', foto);
      }

      const id = this.formulario.get('id')!.value;
      this.service.editar(id, formData).subscribe(() => {
        alert('Foto editada com sucesso.')
        switch(destino) {
          case 'produtos':
            this.router.navigate(['/produtos']);
            break;
          case 'cadastrarEditarFotos':
            this.router.navigate(['/cadastrarEditarFotos', this.produtoId], { queryParams: { descricao: this.descricao }}).then(() => {
            this.recarregarComponente();
            });
            break;
          case 'cadastrarEditarImagens':
            this.router.navigate(['/cadastrarEditarImagens']);
            break;
          case 'cadastrarEditarCores':
            this.router.navigate(['/cadastrarEditarCores']);
            break;
          default:
            this.router.navigate(['/produtos']); // rota padrão
        }
      })
    }
  }

  criarFoto(destino: string) {
    if(this.formulario.valid){
      const formData = new FormData();
      formData.append('cor', this.formulario.get('cor')!.value);
      formData.append('produto', this.formulario.get('produto')!.value);

      console.log(this.formulario.get('foto')!.value)
      const foto = this.formulario.get('foto')!.value;
      if (foto instanceof File) {
        formData.append('foto', foto);
      }

      this.service.criar(formData).subscribe(() => {
        alert('Foto cadastrada com sucesso.')
        switch(destino) {
          case 'produtos':
            this.router.navigate(['/produtos']);
            break;
          case 'cadastrarEditarFotos':
            this.router.navigate(['/cadastrarEditarFotos', this.produtoId], { queryParams: { descricao: this.descricao }}).then(() => {
              this.recarregarComponente();
            });
            break;
          case 'cadastrarEditarCores':
            this.router.navigate(['/cadastrarEditarCores', this.produtoId], { queryParams: { descricao: this.descricao }});
            break;
          case 'cadastrarEditarTamanho':
            this.router.navigate(['/cadastrarEditarTamanho', this.produtoId], { queryParams: { descricao: this.descricao }});
            break;
          default:
            this.router.navigate(['/produtos']); // rota padrão
        }
      }, error => {
        console.log(error)
        alert('Não foi possivel cadastrar. Verifique se essa foto já não foi cadastrado para esse produto.')
      });
    } else {
      alert('Formulário Inválido')
    }
  }

  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/cadastrarEditarFotos', this.produtoId], {
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

  processarArquivo(event: any) {
    const file: File = event.files[0];
    this.formulario.patchValue({ foto: file });
    this.formulario.get('foto')!.updateValueAndValidity();
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir?')){
      this.service.excluir(id).subscribe(() => {
        alert('Foto excluida com sucesso.')
        this.recarregarComponente()
      }, error => {
        console.log(error)
        alert('Erro ao excluir.')
      });
    }
  }
}
