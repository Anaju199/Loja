import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarCoresProdutoComponent } from './cadastrar-cores-produto.component';

describe('CadastrarCoresProdutoComponent', () => {
  let component: CadastrarCoresProdutoComponent;
  let fixture: ComponentFixture<CadastrarCoresProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarCoresProdutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarCoresProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
