import { TestBed } from '@angular/core/testing';

import { ProdutosCarrinhoService } from './produtos-carrinho.service';

describe('ProdutosCarrinhoService', () => {
  let service: ProdutosCarrinhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutosCarrinhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
