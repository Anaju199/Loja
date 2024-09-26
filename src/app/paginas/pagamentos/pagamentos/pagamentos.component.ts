import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PagamentoService } from '../services/pagamento.service';
import { PedidoService } from '../services/pedido.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.css']
})
export class PagamentosComponent implements OnInit {

  formulario!: FormGroup;
  selectedIds: string | null = this.pedidoService.retornarPedido();

  constructor(
    private service: PagamentoService,
    private userService: UserService,
    private pedidoService: PedidoService,
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

      // this.service.criar(formData).subscribe(() => {
      //   alert('Cadastro de endereço realizado com sucesso.');
      //   this.router.navigate(['/confirmarPagamentos'], { queryParams: { ids: this.selectedIds } });
      // }, error => {
      //   alert('Não foi possível cadastrar');
      // });
    } else {
      alert('Formulário Inválido');
    }
  }

  cancelar() {
    this.router.navigate(['/pedidosLink'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao_forms'
    } else {
      return 'botao__desabilitado'
    }
  }

}
