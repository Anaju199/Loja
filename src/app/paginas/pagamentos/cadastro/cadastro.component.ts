import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { CadastroService } from '../services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formulario!: FormGroup;
  formularioEndereco!: FormGroup;

  constructor(
    private service: CadastroService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      ])],
      tax_id: ['', Validators.compose([
        Validators.required,
        Validators.minLength(11)
      ])],
      country: ['55', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      area: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      number: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      type: ['celular', Validators.compose([
        Validators.required
      ])],
      senha: ['', Validators.compose([
        Validators.required
      ])],
      senha_2: ['', Validators.compose([
        Validators.required,
        this.equalTo('senha')
      ])]
    });

  }

  cadastrar() {
    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('nome', this.formulario.get('name')!.value);
      formData.append('cpf', this.formulario.get('tax_id')!.value);
      formData.append('email', this.formulario.get('email')!.value);
      formData.append('celular_pais', this.formulario.get('country')!.value);
      formData.append('celular_ddd', this.formulario.get('area')!.value);
      formData.append('celular_numero', this.formulario.get('number')!.value);
      formData.append('senha', this.formulario.get('senha')!.value);

      this.service.criar(formData).subscribe(() => {
        alert('Cadastro realizado com sucesso.');
        this.router.navigate(['/login']);
      }, error => {
        alert('Não foi possível cadastrar');
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
    this.router.navigate(['/paginaInicial'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao_forms'
    } else {
      return 'botao__desabilitado'
    }
  }
}
