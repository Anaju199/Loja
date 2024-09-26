import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarDetalhesProdutoComponent } from './cadastrar-detalhes-produto.component';

describe('CadastrarDetalhesProdutoComponent', () => {
  let component: CadastrarDetalhesProdutoComponent;
  let fixture: ComponentFixture<CadastrarDetalhesProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarDetalhesProdutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarDetalhesProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
