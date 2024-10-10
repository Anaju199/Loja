import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoresProdutosService } from 'src/app/service/cores-produtos.service';
import { FotosProdutoService } from 'src/app/service/fotos-produtos.service';
import { Cor } from 'src/app/service/tipos';

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

    console.log('iddd',this.produtoId)
    this.formulario = this.formBuilder.group({
      id: [],
      produto: [this.produtoId, Validators.required],
      cor: ['', Validators.required],
      foto: [null, Validators.required],
      inicial: [false]
    });

    // const id = this.route.snapshot.paramMap.get('id')

    // if(id){
    //   this.titulo = 'Editar cor do produto:'

    //   this.service.buscarPorId(parseInt(id!)).subscribe((corProduto) => {
    //     this.id  = corProduto.id
    //     this.formulario = this.formBuilder.group({
    //       id: [corProduto.id],
    //       classe: [corProduto.produto,Validators.compose([
    //         Validators.required
    //       ])],
    //       professores: [corProduto.cor,Validators.compose([
    //         Validators.required
    //       ])],
    //       palavras_chave: [corProduto.inicial]
    //     })
    //   })
    // }

    this.corService.listar().subscribe(
      cores => {
        this.cores = cores;
      },
      error => {
        console.error('Erro ao recuperar cores:', error);
      }
    );
    
  }

  editarFoto(destino: string) {
    if(this.formulario.valid){
      this.service.editar(this.formulario.value).subscribe(() => {
        alert('Foto editada com sucesso.')
        switch(destino) {
          case 'produtos':
            this.router.navigate(['/produtos']);
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
}
