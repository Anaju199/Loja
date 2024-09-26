import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnderecoService } from '../services/endereco.service';
import { ConsultaCepService } from 'src/app/service/consulta-cep.service';
import { UserService } from '../services/user.service';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  formulario!: FormGroup;
  selectedIds: string | null = this.pedidoService.retornarPedido();

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

    this.formulario = this.formBuilder.group({
      usuario: [id],
      street: ['', Validators.compose([
        Validators.required
      ])],
      number: ['', Validators.compose([
        Validators.required
      ])],
      complement: [''],
      locality: ['', Validators.compose([
        Validators.required
      ])],
      city: ['', Validators.compose([
        Validators.required
      ])],
      region_code: ['', Validators.compose([
        Validators.required
      ])],
      country: ['BRA'],
      postal_code: ['', Validators.compose([
        Validators.required
      ])],
      principal: [false]
    });

  }

  cadastrar() {
    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('usuario', this.formulario.get('usuario')!.value);
      formData.append('rua', this.formulario.get('street')!.value);
      formData.append('numero', this.formulario.get('number')!.value);
      formData.append('complemento', this.formulario.get('complement')!.value);
      formData.append('bairro', this.formulario.get('locality')!.value);
      formData.append('cidade', this.formulario.get('city')!.value);
      formData.append('estado', this.formulario.get('region_code')!.value);
      formData.append('pais', this.formulario.get('country')!.value);
      formData.append('cep', this.formulario.get('postal_code')!.value);
      formData.append('principal', this.formulario.get('principal')!.value);

      this.service.criar(formData).subscribe(() => {
        alert('Cadastro de endereço realizado com sucesso.');
        this.router.navigate(['/confirmarPagamentos'], { queryParams: { ids: this.selectedIds } });
      }, error => {
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
      street: dados.logradouro,
      complement: dados.complemento,
      locality: dados.bairro,
      city: dados.localidade,
      region_code: dados.uf
    })
  }

  cancelar() {
    this.router.navigate(['/confirmarPagamentos'], { queryParams: { ids: this.selectedIds } })
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao_forms'
    } else {
      return 'botao__desabilitado'
    }
  }
}
