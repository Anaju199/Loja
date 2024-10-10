export interface Cor{
  id: number,
  produto: Produto,
  cor: string,
  inicial : boolean,
  imagens: Imagem[]
}

export interface Imagem {
  id: number,
  imagem: string,
  Cor: Cor[],
  inicial : boolean
}

export interface Categoria {
  id: number,
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
