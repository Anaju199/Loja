import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarCategoriaProdutoComponent } from './cadastrar-categoria-produto.component';

describe('CadastrarCategoriaProdutoComponent', () => {
  let component: CadastrarCategoriaProdutoComponent;
  let fixture: ComponentFixture<CadastrarCategoriaProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarCategoriaProdutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarCategoriaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
