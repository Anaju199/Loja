import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaoImplementadoComponent } from './nao-implementado.component';

describe('NaoImplementadoComponent', () => {
  let component: NaoImplementadoComponent;
  let fixture: ComponentFixture<NaoImplementadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaoImplementadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaoImplementadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
