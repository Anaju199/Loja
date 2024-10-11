import { TestBed } from '@angular/core/testing';

import { DisponibilidadeProdutoService } from './disponibilidade-produto.service';

describe('DisponibilidadeProdutoService', () => {
  let service: DisponibilidadeProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisponibilidadeProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
