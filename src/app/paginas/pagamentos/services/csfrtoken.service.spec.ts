import { TestBed } from '@angular/core/testing';

import { CsfrtokenService } from './csfrtoken.service';

describe('CsfrtokenService', () => {
  let service: CsfrtokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsfrtokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
