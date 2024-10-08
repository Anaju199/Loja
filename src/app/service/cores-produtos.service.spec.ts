import { TestBed } from '@angular/core/testing';

import { CoresProdutosService } from './cores-produtos.service';

describe('CoresProdutosService', () => {
  let service: CoresProdutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoresProdutosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
