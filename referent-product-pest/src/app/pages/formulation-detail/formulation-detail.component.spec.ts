import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulationDetailComponent } from './formulation-detail.component';

describe('FormulationDetailComponent', () => {
  let component: FormulationDetailComponent;
  let fixture: ComponentFixture<FormulationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulationDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
