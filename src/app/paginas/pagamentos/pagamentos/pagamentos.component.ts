import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PagamentoService } from '../services/pagamento.service';
import { PedidoService } from '../services/pedido.service';
import { UserService } from '../services/user.service';
import { PagSeguroService } from '../services/pagseguro.service';
import { card } from '../tiposPagSeguro';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.css']
})
export class PagamentosComponent implements OnInit {

  formulario!: FormGroup;
  pedidoId: string | null = this.pedidoService.retornarPedido();
  cartoes: any;
  id?: number
 
  constructor(
    private service: PagamentoService,
    private userService: UserService,
    private pedidoService: PedidoService,
    private pagSeguroService: PagSeguroService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const id = this.userService.retornarId();

    if (!id) {
      alert('Usuário não identificado. Por favor, faça login novamente.');
      this.router.navigate(['/login']);
      return;
    }
    
    this.pagSeguroService.loadPagSeguroScript()
      .then(() => console.log('Script PagSeguro carregado com sucesso!'))
      .catch((error) => console.error(error));

    // this.service.listar(id).subscribe((cartoes) => {
    //   this.cartoes = cartoes
    // })

    this.formulario = this.formBuilder.group({
      // cartoes: '',
      usuario: [id],
      nome: ['Ana Julia', Validators.compose([
        Validators.required
      ])],
      numero: ['4539620659922097', Validators.compose([
        Validators.required
      ])],
      mes: ['12', Validators.compose([
        Validators.required
      ])],
      ano: ['2026', Validators.compose([
        Validators.required
      ])],
      secCode: ['123', Validators.compose([
        Validators.required
      ])]
      // principal: [true]
    });

  }

  // onEnderecoSelecionado(event: Event) {
  //   const target = event.target as HTMLSelectElement; // Casting para HTMLSelectElement
  //   const enderecoId = target.value; // Acessa o valor do select
  
  //   if (enderecoId) {
  //     this.service.buscarPorId(enderecoId).subscribe((endereco) => {
  //       this.id = endereco.id;
  //       this.formulario.patchValue({
  //         usuario: endereco.usuario,
  //         nome: endereco.nome,
  //         numero: endereco.numero,
  //         complemento: endereco.complemento,
  //         mes: endereco.mes,
  //         ano: endereco.ano,
  //         secCode: endereco.secCode,
  //         pais: endereco.pais || 'BRA',
  //         cep: endereco.cep,
  //         principal: endereco.principal
  //       });
  //     });
  //   } else {
  //     this.formulario.reset({
  //       cartoes: '',
  //       usuario: [this.id], // Mantém o ID do usuário inicial
  //       nome: '',
  //       numero: '',
  //       complemento: '',
  //       mes: '',
  //       ano: '',
  //       secCode: '',
  //       pais: 'BRA',
  //       cep: '',
  //       principal: true
  //     });
  //     this.id = undefined;
  //   }    
  // }  

  
    // const cardData: card = {
    //   publicKey: chave,
    //   holder: 'Nome Sobrenome',
    //   number: '4242424242424242',
    //   expMonth: '12',
    //   expYear: '2030',
    //   securityCode: '123'
    // };

  processPayment() {    
    const chave = this.pagSeguroService.retornarChavePS();
    // console.log('chave',chave)

    if (this.formulario.invalid) {
      console.error('Formulário inválido!');
      return;
    }
  
    const cardData: card = {
      publicKey: chave,
      holder: this.formulario.get('nome')?.value,
      number: this.formulario.get('numero')?.value,
      expMonth: this.formulario.get('mes')?.value,
      expYear: this.formulario.get('ano')?.value,
      securityCode: this.formulario.get('secCode')?.value
    };

    const result = this.pagSeguroService.encryptCard(cardData);

    if (result) {
      // console.log('Encrypted Card:', result.encryptedCard);
      // console.log('Has Errors:', result.hasErrors);
      // console.log('Errors:', result.errors);
https://developer.pagbank.com.br/reference/criar-pedido
     this.cadastrar()
    }
  }

  chavePublica(){
    const payload: any = {"type": "card"}

    this.pagSeguroService.criarChavePublica(payload).subscribe(() => {
      alert('Cadastro de endereço realizado com sucesso.');
    }, error => {
      console.log('error', error)
      alert('Não foi possível cadastrar');
    });
  }

  cadastrar() {

    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('usuario', this.formulario.get('usuario')!.value);
      formData.append('nome', this.formulario.get('nome')!.value);
      formData.append('numero', this.formulario.get('numero')!.value);
      formData.append('mes', this.formulario.get('mes')!.value);
      formData.append('ano', this.formulario.get('ano')!.value);
      formData.append('secCode', this.formulario.get('secCode')!.value);
      // formData.append('principal', this.formulario.get('principal')!.value);

      // this.service.criar(formData).subscribe(() => {
      //   alert('Cadastro de endereço realizado com sucesso.');
      //   if(this.pedidoId){
      //     this.router.navigate(['/confirmarPagamentos', this.pedidoId]);
      //   } else {
      //     this.router.navigate(['/confirmarPagamentos', this.pedidoId]);
      //   }
      // }, error => {
      //   console.log('error', error)
      //   alert('Não foi possível cadastrar');
      // });
    } else {
      alert('Formulário Inválido');
    }
  }
  
  // editar() {
  //   if (this.formulario.valid) {
  //     const formData = new FormData();
  //     formData.append('usuario', this.formulario.get('usuario')!.value);
  //     formData.append('nome', this.formulario.get('nome')!.value);
  //     formData.append('numero', this.formulario.get('numero')!.value);
  //     formData.append('complemento', this.formulario.get('complemento')!.value || '-');
  //     formData.append('mes', this.formulario.get('mes')!.value);
  //     formData.append('ano', this.formulario.get('ano')!.value);
  //     formData.append('secCode', this.formulario.get('secCode')!.value);
  //     formData.append('pais', this.formulario.get('pais')!.value);
  //     formData.append('cep', this.formulario.get('cep')!.value);
  //     formData.append('principal', this.formulario.get('principal')!.value);

  //     this.service.editar(formData, this.id).subscribe(() => {
  //       alert('Endereço editado com sucesso.');
  //       if(this.pedidoId){
  //         this.router.navigate(['/confirmarPagamentos', this.pedidoId]);
  //       } else {
  //         this.router.navigate(['/endereco']).then(() => {
  //           this.recarregarComponente();
  //         });
  //       }
  //     }, error => {
  //       console.log('error', error)
  //       alert('Não foi possível cadastrar');
  //     });
  //   } else {
  //     alert('Formulário Inválido');
  //   }
  // }

  populandoEndereco(dados: any, f: FormGroup){
    f.patchValue({
      nome: dados.logradouro,
      complemento: dados.complemento,
      mes: dados.mes,
      ano: dados.localidade,
      secCode: dados.uf
    })
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir?')){
      this.service.excluir(id).subscribe(() => {
        alert('Endereço excluido com sucesso.')
        this.recarregarComponente()
      })
    }
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao_forms'
    } else {
      return 'botao__desabilitado'
    }
  }
  
  caminho(destino: string) {
    switch(destino) {
      case 'editarPerfil':
        this.router.navigate(['/editarPerfil', this.id]);
        break;
      case 'formasPagamento':
        this.router.navigate(['/formasPagamento', this.id]);
        break;
      default:
        this.router.navigate(['/editarPerfil', this.id]);
    }
  }

  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/endereco']);
  }
}
