import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnderecoService } from '../services/endereco.service';
import { ConsultaCepService } from 'src/app/service/consulta-cep.service';
import { UserService } from '../services/user.service';
import { PedidoService } from '../services/pedido.service';
import { Endereco } from '../tipos';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  formulario!: FormGroup;
  pedidoId: string | null = this.pedidoService.retornarPedido();
  enderecos: Endereco[] = [];
  id?: number

  constructor(
    private service: EnderecoService,
    private userService: UserService,
    private pedidoService: PedidoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private consultacepService: ConsultaCepService
  ) { }

  ngOnInit(): void {
    const id = this.userService.retornarId();

    if (!id) {
      alert('Usuário não identificado. Por favor, faça login novamente.');
      this.router.navigate(['/login']);
      return;
    }

    this.service.listar(id).subscribe((enderecos) => {
      this.enderecos = enderecos
    })

    this.formulario = this.formBuilder.group({
      enderecos: '',
      usuario: [id],
      rua: ['', Validators.compose([
        Validators.required
      ])],
      numero: ['', Validators.compose([
        Validators.required
      ])],
      complemento: [''],
      bairro: ['', Validators.compose([
        Validators.required
      ])],
      cidade: ['', Validators.compose([
        Validators.required
      ])],
      estado: ['', Validators.compose([
        Validators.required
      ])],
      pais: ['BRA'],
      cep: ['', Validators.compose([
        Validators.required
      ])],
      principal: [true]
    });

  }

  onEnderecoSelecionado(event: Event) {
    const target = event.target as HTMLSelectElement; // Casting para HTMLSelectElement
    const enderecoId = target.value; // Acessa o valor do select
  
    if (enderecoId) {
      this.service.buscarPorId(enderecoId).subscribe((endereco) => {
        this.id = endereco.id;
        this.formulario.patchValue({
          usuario: endereco.usuario,
          rua: endereco.rua,
          numero: endereco.numero,
          complemento: endereco.complemento,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          estado: endereco.estado,
          pais: endereco.pais || 'BRA',
          cep: endereco.cep,
          principal: endereco.principal
        });
      });
    } else {
      this.formulario.reset({
        enderecos: '',
        usuario: [this.id], // Mantém o ID do usuário inicial
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        pais: 'BRA',
        cep: '',
        principal: true
      });
      this.id = undefined;
    }    
  }  

  cadastrar() {
    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('usuario', this.formulario.get('usuario')!.value);
      formData.append('rua', this.formulario.get('rua')!.value);
      formData.append('numero', this.formulario.get('numero')!.value);
      formData.append('complemento', this.formulario.get('complemento')!.value || '-');
      formData.append('bairro', this.formulario.get('bairro')!.value);
      formData.append('cidade', this.formulario.get('cidade')!.value);
      formData.append('estado', this.formulario.get('estado')!.value);
      formData.append('pais', this.formulario.get('pais')!.value);
      formData.append('cep', this.formulario.get('cep')!.value);
      formData.append('principal', this.formulario.get('principal')!.value);

      this.service.criar(formData).subscribe(() => {
        alert('Cadastro de endereço realizado com sucesso.');
        if(this.pedidoId){
          this.router.navigate(['/confirmarPagamentos', this.pedidoId]);
        } else {
          this.router.navigate(['/confirmarPagamentos', this.pedidoId]);
        }
      }, error => {
        console.log('error', error)
        alert('Não foi possível cadastrar');
      });
    } else {
      alert('Formulário Inválido');
    }
  }
  
  editar() {
    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('usuario', this.formulario.get('usuario')!.value);
      formData.append('rua', this.formulario.get('rua')!.value);
      formData.append('numero', this.formulario.get('numero')!.value);
      formData.append('complemento', this.formulario.get('complemento')!.value || '-');
      formData.append('bairro', this.formulario.get('bairro')!.value);
      formData.append('cidade', this.formulario.get('cidade')!.value);
      formData.append('estado', this.formulario.get('estado')!.value);
      formData.append('pais', this.formulario.get('pais')!.value);
      formData.append('cep', this.formulario.get('cep')!.value);
      formData.append('principal', this.formulario.get('principal')!.value);

      this.service.editar(formData, this.id).subscribe(() => {
        alert('Endereço editado com sucesso.');
        if(this.pedidoId){
          this.router.navigate(['/confirmarPagamentos', this.pedidoId]);
        } else {
          this.router.navigate(['/endereco']).then(() => {
            this.recarregarComponente();
          });
        }
      }, error => {
        console.log('error', error)
        alert('Não foi possível cadastrar');
      });
    } else {
      alert('Formulário Inválido');
    }
  }

  consultaCEP(ev: any, f: FormGroup) {
    const cep = ev.target.value;
    if (cep !== "") {
      this.consultacepService.getConsultaCep(cep).subscribe({
        next: (resultado) => {
          if (resultado && Object.keys(resultado).length) {
            this.populandoEndereco(resultado, f);
          } else {
            alert('CEP não encontrado.');
          }
        },
        error: (err) => {
          console.error(err);
          alert('Ocorreu um erro ao consultar o CEP.');
        }
      });
    }
  }

  populandoEndereco(dados: any, f: FormGroup){
    f.patchValue({
      rua: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
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
