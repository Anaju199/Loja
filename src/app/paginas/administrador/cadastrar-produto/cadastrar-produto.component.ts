import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from 'src/app/service/produtos.service';

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

      this.service.buscarPorId(parseInt(id!)).subscribe((produto) => {
        this.id  = produto.id
        this.formulario = this.formBuilder.group({
          id: [produto.id],
          classe: [produto.descricao,Validators.compose([
            Validators.required
          ])],
          professores: [produto.valor,Validators.compose([
            Validators.required
          ])],
          palavras_chave: [produto.palavras_chave]
        })
      })

    }
  }

  editarProduto(destino: string) {
    if(this.formulario.valid){
      this.service.editar(this.formulario.value).subscribe((response: any) => {
        const produtoId = response.id;
        const descricaoProduto = this.formulario.value.descricao;

        console.log('id', produtoId)
        console.log('desc', descricaoProduto)
        console.log('desti',destino)
        alert('Produto editado com sucesso.')
        switch(destino) {
          case 'produtos':
            this.router.navigate(['/produtos']);
            break;
          case 'cadastrarEditarFotos':
            this.router.navigate(['/cadastrarEditarFotos']);
            break;
          case 'cadastrarEditarCores':
            console.log('cor')
            this.router.navigate(['/cadastrarEditarCores', produtoId], { queryParams: { descricao: descricaoProduto } });
            break;
          default:
            this.router.navigate(['/produtos']); // rota padrão
        }
      })
    }
  }

  criarProduto(destino: string) {
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe((response: any) => {
        const produtoId = response.id;
        const descricaoProduto = this.formulario.value.descricao;

        switch(destino) {
          case 'produtos':
            alert('Produto cadastrado com sucesso.')
            this.router.navigate(['/produtos']);
            break;
          // case 'cadastrarEditarFotos':
          //   this.router.navigate(['/cadastrarEditarFotos', produtoId], { queryParams: { descricao: descricaoProduto } });
          //   break;
          case 'cadastrarEditarCores':
            this.router.navigate(['/cadastrarEditarCores', produtoId], { queryParams: { descricao: descricaoProduto } });
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
