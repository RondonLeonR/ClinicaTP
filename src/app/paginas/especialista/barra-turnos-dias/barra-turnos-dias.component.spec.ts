import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraTurnosDiasComponent } from './barra-turnos-dias.component';

describe('BarraTurnosDiasComponent', () => {
  let component: BarraTurnosDiasComponent;
  let fixture: ComponentFixture<BarraTurnosDiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraTurnosDiasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraTurnosDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
