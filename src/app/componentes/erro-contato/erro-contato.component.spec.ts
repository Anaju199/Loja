import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroContatoComponent } from './erro-contato.component';

describe('ErroContatoComponent', () => {
  let component: ErroContatoComponent;
  let fixture: ComponentFixture<ErroContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErroContatoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErroContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
