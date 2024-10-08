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
  classes: string[] = [];
  ano: number = new Date().getFullYear()
  titulo: string = 'Adicione uma novo cor possivel para o produto:'
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

  editarProduto(destino: string) {
    if(this.formulario.valid){
      this.service.editar(this.formulario.value).subscribe(() => {
        alert('Cor editada com sucesso.')
        switch(destino) {
          case 'listarProduto':
            this.router.navigate(['/listarProduto']);
            break;
          case 'cadastrarEditarImagens':
            this.router.navigate(['/cadastrarEditarImagens']);
            break;
          case 'cadastrarEditarCores':
            this.router.navigate(['/cadastrarEditarCores']);
            break;
          default:
            this.router.navigate(['/listarProduto']); // rota padrão
        }
      })
    }
  }

  criarProduto(destino: string) {
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(() => {
        alert('Cor cadastrada com sucesso.')
        switch(destino) {
          case 'listarProduto':
            this.router.navigate(['/listarProduto']);
            break;
          case 'adicionarImagens':
            this.router.navigate(['/adicionarImagens']);
            break;
          case 'adicionarCores':
            this.router.navigate(['/adicionarCores']);
            break;
          default:
            this.router.navigate(['/listarProduto']); // rota padrão
        }
      }, error => {
        alert('Não foi possivel cadastrar. Verifique se esse corProduto já não foi cadastrado.')
      });
    } else {
      alert('Formulário Inválido')
    }
  }

  cancelar() {
    this.router.navigate(['/listarProduto'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao_forms'
    } else {
      return 'botao__desabilitado'
    }
  }

}
