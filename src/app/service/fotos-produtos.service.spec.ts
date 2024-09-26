import { TestBed } from '@angular/core/testing';

import { FotosProdutosService } from './fotos-produtos.service';

describe('FotosProdutosService', () => {
  let service: FotosProdutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotosProdutosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
