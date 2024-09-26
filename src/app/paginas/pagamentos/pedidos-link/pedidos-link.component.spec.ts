import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosLinkComponent } from './pedidos-link.component';

describe('PedidosLinkComponent', () => {
  let component: PedidosLinkComponent;
  let fixture: ComponentFixture<PedidosLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
