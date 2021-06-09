import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionPDFComponent } from './creacion-pdf.component';

describe('CreacionPDFComponent', () => {
  let component: CreacionPDFComponent;
  let fixture: ComponentFixture<CreacionPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionPDFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreacionPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
