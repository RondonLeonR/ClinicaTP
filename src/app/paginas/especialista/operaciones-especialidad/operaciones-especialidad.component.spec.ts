import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesEspecialidadComponent } from './operaciones-especialidad.component';

describe('OperacionesEspecialidadComponent', () => {
  let component: OperacionesEspecialidadComponent;
  let fixture: ComponentFixture<OperacionesEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacionesEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionesEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
