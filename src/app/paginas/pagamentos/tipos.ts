
export interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  celular_pais: string;
  celular_ddd: string;
  celular_numero: string;
  senha: string;
  // cliente: boolean; todos os usuários da loja são clientes
  administrador: boolean;
}

export interface Endereco {
  id: number;
  usuario: Usuario;
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
  cliente: string;
  status: string;
  data_pedido: string;
  atualizado_em: string;
  quant_itens: number;
  valor: string;
  data_pgt: string;
  numero_pgt: string;
  link_pgt: string
  itens_pedido: itemPedido[];
  numero_pedido: number;
}

export interface itemPedido {
  id: number;
  pedido: Pedido;
  produto_id: string;
  descricao: string;
  valor: string;
  cor: string;
  tamanho: string;
  quantidade: string;
  foto: string
}

// export interface Pagamento {
//   id: number;
//   usuario: string;
//   pedido: string;
//   endereco: string;
//   forma_pgt: string;
//   data_pgt: string;
// }

export interface Cartao {
  
}