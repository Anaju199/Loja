import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ContatoService } from "./contato.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contato } from "./contato";

@Component({
  selector: "app-contato",
  templateUrl: "./contato.component.html",
  styleUrls: ["./contato.component.css"],
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;
  contato: Contato [] = []

  constructor(
    private service: ContatoService,
    private router: Router,
    private formBuilder: FormBuilder
){}

// ngOnInit(): void {
//   this.formulario = this.formBuilder.group({
//     nome: ['',Validators.compose([
//       Validators.required,
//     ])],
//     data_nascimento: ['1900-01-01'],
//     telefone: ['',Validators.compose([
//       Validators.required,
//     ])],
//     telefone_retorno: [false,Validators.compose([
//       Validators.required,
//     ])],
//     email: ['',Validators.compose([
//       Validators.required,
//     ])],
//     email_retorno: [false,Validators.compose([
//       Validators.required,
//     ])],
//     mensagem: ['',Validators.compose([
//       Validators.required,
//     ])]
//   })
// }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: ['',Validators.compose([
        Validators.required,
      ])],
      data_nascimento: [''],
      telefone: [''],
      telefone_retorno: [false,Validators.compose([
        Validators.required,
      ])],
      email: [''],
      email_retorno: [false,Validators.compose([
        Validators.required,
      ])],
      mensagem: ['',Validators.compose([
        Validators.required,
      ])]
    })
  }

  cadastrar() {
    if (this.valido()) {
      const formData = new FormData();
      formData.append('nome', this.formulario.get('nome')!.value);
      formData.append('data_nascimento', this.formulario.get('data_nascimento')!.value);
      formData.append('telefone', this.formulario.get('telefone')!.value);
      formData.append('telefone_retorno', this.formulario.get('telefone_retorno')!.value);
      formData.append('email', this.formulario.get('email')!.value);
      formData.append('email_retorno', this.formulario.get('email_retorno')!.value);
      formData.append('mensagem', this.formulario.get('mensagem')!.value);

      this.service.criar(formData).subscribe(() => {
        alert('Contato realizado com sucesso.')
          this.router.navigate(['/sucesso']);
        // this.service.enviarEmail(this.formulario.value).subscribe(() => {
        //   alert('Contato realizado com sucesso.')
        //   this.router.navigate(['/sucesso']);
        // }, error => {
        //   this.router.navigate(['/erro']);
        // });
      }, error => {
        this.router.navigate(['/erro']);
      });
    }
  }

  paginaInicial() {
    this.router.navigate(['/paginaInicial'])
  }

  valido() {
    if (this.formulario.valid) {
      return true
    } else {
      alert('Formulário inválido')
      return false
    }
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }
}
