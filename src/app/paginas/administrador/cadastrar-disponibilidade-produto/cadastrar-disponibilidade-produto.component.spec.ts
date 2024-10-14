import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarDisponibilidadeProdutoComponent } from './cadastrar-disponibilidade-produto.component';

describe('CadastrarDisponibilidadeProdutoComponent', () => {
  let component: CadastrarDisponibilidadeProdutoComponent;
  let fixture: ComponentFixture<CadastrarDisponibilidadeProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarDisponibilidadeProdutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarDisponibilidadeProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
