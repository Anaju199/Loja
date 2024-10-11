import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TamanhosProdutoService } from 'src/app/service/tamanhos-produto.service';

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

  constructor(
    private service: TamanhosProdutoService,
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
      tamanho: ['', Validators.required]
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
  }

  editarTamanho(destino: string) {
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
            this.router.navigate(['/cadastrarEditarTamanho']);
            break;
          default:
            this.router.navigate(['/produtos']); // rota padrão
        }
      })
    }
  }

  criarTamanho(destino: string) {
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

}
