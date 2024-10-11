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
  palavras_chave: string
}

export interface Disponibilidade {
  id: number,
  produto: Produto,
  cor: Cor,
  Tamanho: Tamanho,
  quantidade_disponivel: number
}
