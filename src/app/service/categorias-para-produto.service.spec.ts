import { TestBed } from '@angular/core/testing';

import { CategoriasParaProdutoService } from './categorias-para-produto.service';

describe('CategoriasParaProdutoService', () => {
  let service: CategoriasParaProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriasParaProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
