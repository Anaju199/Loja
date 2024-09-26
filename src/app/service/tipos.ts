export interface Cor{
  id: number,
  cor: string,
  inicial : boolean,
  imagens: Imagem[]
}

export interface Imagem {
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
  id: string,
  descricao: string,
  valor: number,
  cores: Cor[],
  categorias: Categoria[],
  tamanhos: Tamanho[],
  palavras_chase: string
}
