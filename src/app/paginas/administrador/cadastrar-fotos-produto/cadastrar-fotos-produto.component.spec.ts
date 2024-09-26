import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarFotosProdutoComponent } from './cadastrar-fotos-produto.component';

describe('CadastrarFotosProdutoComponent', () => {
  let component: CadastrarFotosProdutoComponent;
  let fixture: ComponentFixture<CadastrarFotosProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarFotosProdutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarFotosProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
