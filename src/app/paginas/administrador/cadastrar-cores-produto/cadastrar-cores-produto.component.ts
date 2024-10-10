import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoresProdutosService } from 'src/app/service/cores-produtos.service';

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

  constructor(
    private service: CoresProdutosService,
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
  }

  editarCor(destino: string) {
    if(this.formulario.valid){
      this.service.editar(this.formulario.value).subscribe(() => {
        alert('Cor editada com sucesso.')
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
