
export interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  celular_pais: string;
  celular_ddd: string;
  celular_numero: string;
}

export interface Endereco {
  id: number;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
  principal: boolean;
}

export interface Pedido {
  id: number;
  usuario: string;
  item: string;
  valor_pgt: string;
  data_pgt: string;
  numero_pgt: string;
  link_pgt: string
}

// export interface Pagamento {
//   id: number;
//   usuario: string;
//   pedido: string;
//   endereco: string;
//   forma_pgt: string;
//   data_pgt: string;
// }

