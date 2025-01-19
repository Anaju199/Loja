import { Usuario } from "../paginas/pagamentos/tipos"

export interface Cor{
  id: number,
  produto: Produto,
  cor: string,
  inicial : boolean,
  imagens: Imagem[]
}

export interface Imagem {
  id: number,
  foto: string,
  Cor: Cor[],
  inicial : boolean
}

export interface Categoria {
  id: number,
  categoria: string
}

export interface CategoriaProduto {
  id: number,
  produto: Produto,
  categoria: string
}

export interface Tamanho {
  id: number,
  tamanho: string
}

export interface Produto {
  id: number,
  descricao: string,
  valor: number,
  cores: Cor[],
  categorias: Categoria[],
  tamanhos: Tamanho[],
  palavras_chave: string,
  is_favorito: boolean
}

export interface Disponibilidade {
  id: number,
  produto: Produto,
  cor: Cor,
  Tamanho: Tamanho,
  quantidade_disponivel: number
}

export interface Favorito {
  id: number,
  cliente: Usuario,
  produto: Produto,
}

export interface Carrinho {
  id: number,
  cliente: Usuario,
  produto: Produto,
  produto_id: number,
  descricao: string,
  valor: number,
  cor_selecionada: Cor,
  tamanho_selecionado: Tamanho,
  quantidade: number,
  selecionado: boolean,
  foto: string | null
}
