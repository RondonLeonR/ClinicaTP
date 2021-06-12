import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesMostrarEspecialistasComponent } from './botones-mostrar-especialistas.component';

describe('BotonesMostrarEspecialistasComponent', () => {
  let component: BotonesMostrarEspecialistasComponent;
  let fixture: ComponentFixture<BotonesMostrarEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonesMostrarEspecialistasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonesMostrarEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
