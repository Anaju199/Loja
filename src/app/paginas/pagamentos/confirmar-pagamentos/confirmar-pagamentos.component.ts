import { itemPedido, Usuario } from './../tipos';
import { Component, Input, OnInit } from '@angular/core';
import { Endereco, Pedido } from '../tipos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnderecoService } from '../services/endereco.service';
import { PagamentoService } from '../services/pagamento.service';
import { UserService } from '../services/user.service';
import { PedidoService } from '../services/pedido.service';
import { Address, Customer, Item, payload, Phones } from '../tiposPagSeguro';
import { environment } from 'src/environments/environment';
import { CadastroService } from '../services/cadastro.service';

@Component({
  selector: 'app-confirmar-pagamentos',
  templateUrl: './confirmar-pagamentos.component.html',
  styleUrls: ['./confirmar-pagamentos.component.css']
})
export class ConfirmarPagamentosComponent implements OnInit {

  private readonly site = environment.linkSite

  selectedEndereco: Address | null = null;
  selectedUsuario: Customer | null = null;
  selectedPedido: Item | null = null;

  address: Address = {
    street: "",
    number: "",
    complement: "",
    locality: "",
    city: "",
    region_code: "",
    country: "BRA",
    postal_code: ""
  };

  item: Item = {
    reference_id: "",
    name: "",
    quantity: 0,
    unit_amount: 0
  }

  phones: Phones = {
    country: "",
    area: "",
    number: "",
    type: "MOBILE"
  }

  customer: Customer = {
    name: "",
    email: "",
    tax_id: "",
    phones: [this.phones]
  }

  itens: Item[] = []
  usuarios: Usuario[] = []
  enderecos: Endereco[] = [];
  pedido!: Pedido;
  pedidoId: number = 0;
  listaEnderecos: Endereco[] = [];
  selectedIds: number[] = [];
  principal: boolean = true
  endereco!: Endereco

  payload: payload = {
    reference_id: "ex-00001",
    customer: {
        "name": "Jose da Silva",
        "email": "email@test.com",
        "tax_id": "12345678909",
        "phones": [
                    {
                      "country": "55",
                      "area": "11",
                      "number": "999999999",
                      "type": "MOBILE"
                    }
                  ]
    },
    items: [
        {
            "reference_id": "referencia do item",
            "name": "nome do item",
            "quantity": 1,
            "unit_amount": 500
        }
    ],
    qr_codes: [{ "amount": { "value": 500, "currency": "BRL" } }],
    shipping: { "address": {
            "street": "Avenida Brigadeiro Faria Lima",
            "number": "1384",
            "complement": "apto 12",
            "locality": "Pinheiros",
            "city": "São Paulo",
            "region_code": "SP",
            "country": "BRA",
            "postal_code": "01452002"
        } },
    billing: { "address": {
            "street": "Avenida Brigadeiro Faria Lima",
            "number": "1384",
            "complement": "apto 12",
            "locality": "Pinheiros",
            "city": "São Paulo",
            "region_code": "SP",
            "country": "BRA",
            "postal_code": "01452002"
        } },
    notification_urls: [this.site + "/notificacoes"],
    charges: [
      {
          "reference_id": "referencia da cobranca",
          "description": "descricao da cobranca",
          "amount": {
              "value": 500,
              "currency": "BRL"
          },
          "payment_method": {
              "type": "CREDIT_CARD",
              "installments": 1,
              "capture": true,
              "card": {
                  "encrypted":"V++53ir0qvoK/rUSzNjCqP8Hz9ZTa+HohR779n63CV+NvCeYj4J4lQevL4NKN7Di3BxKQGqfQW5cfS7/4rHw4w8URuOV/j/mGau2GXxkKQ6/szJ6BQr//C4e4XgfCHDwcONQhuPDHMdOB1C+4lzyBbsPJUZ/8TUQrxhMMiMFjwGeg62uf7cUqdFjp+Q5dqJXwhLgH3d1EoX+JKStBLqVzF0lW3gHtFOyfvFhuxxBgB0xrzTKfbTqnL5aSYBoGXRFM0gLodMm6knx7bW+syThxyQffnaigCwj2aNohsu+fuXII+3WnlgrHQxaBx3ChRuWKy+loV2L2USiGulp/bPEcg==",
                  "store": false
              },
              "holder": {
                "name": "Jose da Silva",
                "tax_id": "65544332211"
              }
          }
      }
   ]
  }

  constructor(
    private service: PagamentoService,
    private enderecoService: EnderecoService,
    private userService: UserService,
    private pedidoService: PedidoService,
    private usuarioService: CadastroService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   const ids = params['ids'];
    //   if (ids) {
    //     this.selectedIds = ids.split(',').map((id: string) => +id);
    //   }
    // });
    this.pedidoId = this.route.snapshot.params['id'];

    this.pedidoService.setPedido(this.pedidoId.toString())

    const id = this.userService.retornarId();

    this.enderecoService.listarPrincipal(id?.toString()).subscribe(
      enderecos => {
        this.enderecos = enderecos;
      },
      error => {
        console.error('Erro ao recuperar enderecos:', error);
      }
    );

    this.pedidoService.buscarPorId(this.pedidoId).subscribe(
      pedido => {
        this.pedido = pedido;
      },
      error => {
        console.error('Erro ao recuperar pedido:', error);
      }
    );

    this.usuarioService.listarUsuario(id?.toString()).subscribe(
      usuarios => {
        this.usuarios = usuarios;
      },
      error => {
        console.error('Erro ao recuperar usuario:', error);
      }
    );

  }

  confirmarPagamento() {
    this.payload.reference_id = this.item.reference_id
    this.payload.customer = this.customer
    this.payload.billing.address = this.address
    this.payload.shipping.address = this.address
    this.payload.items = this.itens
    console.log(this.payload)

    this.service.criar(this.payload).subscribe(() => {
      alert('Pagamento realizado com sucesso.');
      this.pedidoService.removePedido();

      this.pedido.status = 'Finalizado'
      console.log('pedido',this.pedido)
      alert("Statuso do pedido alterado")
      // this.pedidoService.editar(this.pedidoId, this.pedido).subscribe(
      //   () => {
      //     alert("Statuso do pedido alterado")
      //   },
      //   error => {
      //     console.error(error);
      //     alert("Erro ao adicionar produto ao carrinho")
      //   }
      // );
     
      setTimeout(() => {
        this.router.navigate(['/pedidos']);
      }, 2000);
    }, error => {
      console.log('erro', error)
      alert('Não foi possível realizar o pagamento.');
    });
  }

  listaPrincipal(){
    this.principal = !this.principal;
    const selectedRadio = document.querySelector('input[name="flexRadio"]:checked') as HTMLInputElement;

    if(this.principal){
      if (selectedRadio) {
        const id = selectedRadio.value;
        this.enderecoService.buscarPorId(id).subscribe(
          endereco => {
            if (endereco) {
              endereco.principal = true;
              this.enderecoService.editarPrincipal(endereco).subscribe(() => {
                alert('Endereço atualizado com sucesso.');
                this.recarregarComponente()
              }, error => {
                console.error('Erro ao atualizar o endereço principal:', error);
                alert('Não foi possível atualizar o endereço principal.');
              });
            } else {
              alert('Endereço não encontrado.');
            }
          },
          error => {
            console.error('Erro ao buscar endereço:', error);
          }
        );
      }
    }else{
      const id = this.userService.retornarId();
      this.enderecoService.listar(id?.toString()).subscribe(
        listaEnderecos => {
          this.listaEnderecos = listaEnderecos;
        },
        error => {
          console.error('Erro ao recuperar listaEnderecos:', error);
        }
      );
    }
  }

  cancelar() {
    this.router.navigate(['/pedidos'])
  }

  pagamentos() {
    this.router.navigate(['/pagamentos'])
  }

  recarregarComponente(){
    location.reload();
  }

  // getPedidoById(id: number): Pedido | undefined {
  //   return this.pedidos.find(pedido => pedido.id === id);
  // }

  salvaEndereco(endereco: any): void {
    this.selectedEndereco = endereco;
    this.address = {
      street: endereco.rua,
      number: endereco.numero,
      complement: endereco.complemento,
      locality: endereco.bairro,
      city: endereco.cidade,
      region_code: endereco.estado,
      country: endereco.pais,
      postal_code: endereco.cep
    };
  }

  salvaItem(pedido: any): void {
    this.selectedPedido = pedido;
    const valor = parseFloat(pedido.valor.replace(',', '.'));
    this.item = {
      reference_id: pedido.id,
      name: pedido.descricao,
      quantity: pedido.quantidade,
      unit_amount: 10.00
    };
    if (!this.itens.some(item => item.reference_id === this.item.reference_id)) {
      this.itens.push(this.item);
    }
  }

  salvaUsuario(usuario: any): void {
    this.selectedUsuario = usuario;
    this.customer = {
      name: usuario.nome,
      email: usuario.email,
      tax_id: '15035113671',//usuario.cpf,
      phones: this.customer.phones = [
                                        {
                                          country: usuario.celular_pais,
                                          area: usuario.celular_ddd,
                                          number: usuario.celular_numero,
                                          type:"MOBILE",
                                        }
                                      ]
    };
  }

}
