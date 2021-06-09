import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionEmailComponent } from './verificacion-email.component';

describe('VerificacionEmailComponent', () => {
  let component: VerificacionEmailComponent;
  let fixture: ComponentFixture<VerificacionEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificacionEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificacionEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
