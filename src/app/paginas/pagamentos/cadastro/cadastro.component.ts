import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { CadastroService } from '../services/cadastro.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  alterarSenha: boolean = false;

  id?: number;
  formulario!: FormGroup;
  formularioEndereco!: FormGroup;
  isAdmin: boolean = false;
  titulo: string = 'Digite os dados para cadastro:'
  textoPagina: string = 'Voltar para página Inicial'

  constructor(
    private userService: UserService,
    private service: CadastroService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const role = this.userService.retornarUserRole();
    this.isAdmin = role === 'admin';

    this.route.queryParams.subscribe(params => {
      this.alterarSenha = params['alterarSenha'] === 'true';  // Verifica se alterarSenha é 'true'
    });

    this.formulario = this.formBuilder.group({
      nome: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      cpf: ['', Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11), 
          this.cpfValidator()
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ])],
      celular_pais: ['55', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      celular_ddd: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      celular_numero: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      senha: ['', Validators.compose([
        Validators.required
      ])],
      senha_2: ['', Validators.compose([
        Validators.required,
        this.equalTo('senha')
      ])],
      administrador: [false]
    });

    const id = this.route.snapshot.paramMap.get('id')

    if(id){
      this.titulo = 'Editar informações:'

      this.service.buscarPorId(parseInt(id!)).subscribe((cliente) => {
        this.id = cliente.id

        this.formulario = this.formBuilder.group({
          id: [cliente.id],
          nome: [cliente.nome, Validators.compose([
            Validators.required,
            Validators.minLength(2)
          ])],
          cpf: [cliente.cpf, Validators.compose([
              Validators.required,
              Validators.minLength(11),
              Validators.maxLength(11), 
              this.cpfValidator()
          ])],
          email: [cliente.email, Validators.compose([
            Validators.required,
            Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
          ])],
          celular_pais: [cliente.celular_pais, Validators.compose([
            Validators.required,
            Validators.minLength(2)
          ])],
          celular_ddd: [cliente.celular_ddd, Validators.compose([
            Validators.required,
            Validators.minLength(2)
          ])],
          celular_numero: [cliente.celular_numero, Validators.compose([
            Validators.required,
            Validators.minLength(8)
          ])],
          senha: [this.alterarSenha ? '' : cliente.senha, Validators.compose([
            Validators.required
          ])],
          senha_2: [this.alterarSenha ? '' : cliente.senha, Validators.compose([
            Validators.required,
            this.equalTo('senha')
          ])],
          administrador: [cliente.administrador]
        });
      })
    }
  }

  user$ = this.userService.retornarUser();

  cadastrar() {
    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('nome', this.formulario.get('nome')!.value);
      formData.append('cpf', this.formulario.get('cpf')!.value);
      formData.append('email', this.formulario.get('email')!.value);
      formData.append('celular_pais', this.formulario.get('celular_pais')!.value);
      formData.append('celular_ddd', this.formulario.get('celular_ddd')!.value);
      formData.append('celular_numero', this.formulario.get('celular_numero')!.value);
      formData.append('senha', this.formulario.get('senha')!.value);
      formData.append('administrador', this.formulario.get('administrador')!.value);

      this.service.criar(formData).subscribe(() => {
        alert('Cadastro realizado com sucesso.');
        this.router.navigate(['/login']);
      }, error => {
        console.log('erroo ',error)
        alert('Não foi possível cadastrar');
      });
    } else {
      alert('Formulário Inválido');
    }
  }

  editar() {
    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('nome', this.formulario.get('nome')!.value);
      formData.append('cpf', this.formulario.get('cpf')!.value);
      formData.append('email', this.formulario.get('email')!.value);
      formData.append('celular_pais', this.formulario.get('celular_pais')!.value);
      formData.append('celular_ddd', this.formulario.get('celular_ddd')!.value);
      formData.append('celular_numero', this.formulario.get('celular_numero')!.value);
      formData.append('senha', this.formulario.get('senha')!.value);
      formData.append('administrador', this.formulario.get('administrador')!.value);

      const id = this.formulario.get('id')!.value;
      this.service.editar(id, formData).subscribe(() => {
        alert('Edição realizada com sucesso.');
        this.router.navigate(['/paginaInicial']);
      }, error => {
        console.log('erroo ',error)
        alert('Não foi possível editar, entre em contato com o administrador');
      });
    } else {
      alert('Formulário Inválido');
    }
  }

  equalTo(otherField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fieldValue = control.value
      const otherFieldValue = control.root.get(otherField)?.value
      if(fieldValue !== otherFieldValue) {
        return { equalTo: true}
      }
      return null
    }
  }

  cancelar() {
    if(this.alterarSenha){
      this.alterarSenha = !this.alterarSenha
      this.router.navigate(['/editarCliente', this.id])
    } else {
      this.textoPagina = 'Voltar para página Inicial'
      this.router.navigate(['/paginaInicial'])
    }
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao_forms'
    } else {
      return 'botao__desabilitado'
    }
  }

  
  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }
  
    const calcDigito = (base: number) => {
      let soma = 0;
      for (let i = 0; i < base; i++) {
        soma += +cpf[i] * (base + 1 - i);
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };
  
    const digito1 = calcDigito(9);
    const digito2 = calcDigito(10);
  
    return digito1 === +cpf[9] && digito2 === +cpf[10];
  }

  cpfValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cpf = control.value;
      if (!cpf) {
        return null;
      }
      return this.validarCPF(cpf) ? null : { cpfInvalido: true };
    };
  }

  caminho(destino: string) {
    switch(destino) {
      case 'endereco':
        this.router.navigate(['/endereco']);
        break;
      case 'formasPagamento':
        this.router.navigate(['/formasPagamento', this.id]);
        break;
      default:
        this.router.navigate(['/produtos']); // rota padrão
    }
  }
}
