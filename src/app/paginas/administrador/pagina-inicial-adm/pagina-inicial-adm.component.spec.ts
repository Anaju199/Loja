import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInicialAdmComponent } from './pagina-inicial-adm.component';

describe('PaginaInicialAdmComponent', () => {
  let component: PaginaInicialAdmComponent;
  let fixture: ComponentFixture<PaginaInicialAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaInicialAdmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaInicialAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
