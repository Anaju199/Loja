import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarPagamentosComponent } from './confirmar-pagamentos.component';

describe('ConfirmarPagamentosComponent', () => {
  let component: ConfirmarPagamentosComponent;
  let fixture: ComponentFixture<ConfirmarPagamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarPagamentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarPagamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
