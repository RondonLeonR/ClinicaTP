import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesSolicitarTurnoComponent } from './botones-solicitar-turno.component';

describe('BotonesSolicitarTurnoComponent', () => {
  let component: BotonesSolicitarTurnoComponent;
  let fixture: ComponentFixture<BotonesSolicitarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonesSolicitarTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonesSolicitarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
