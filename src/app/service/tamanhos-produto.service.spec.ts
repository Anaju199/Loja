import { TestBed } from '@angular/core/testing';

import { TamanhosProdutoService } from './tamanhos-produto.service';

describe('TamanhosProdutoService', () => {
  let service: TamanhosProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TamanhosProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
