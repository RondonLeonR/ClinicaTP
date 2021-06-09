import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitarEspecialidadComponent } from './habilitar-especialidad.component';

describe('HabilitarEspecialidadComponent', () => {
  let component: HabilitarEspecialidadComponent;
  let fixture: ComponentFixture<HabilitarEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabilitarEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilitarEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
