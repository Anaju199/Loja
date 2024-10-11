import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarTamanhosProdutoComponent } from './cadastrar-tamanhos-produto.component';

describe('CadastrarTamanhosProdutoComponent', () => {
  let component: CadastrarTamanhosProdutoComponent;
  let fixture: ComponentFixture<CadastrarTamanhosProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarTamanhosProdutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarTamanhosProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
