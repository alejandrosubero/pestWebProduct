import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulationEditComponent } from './formulation-edit.component';

describe('FormulationEditComponent', () => {
  let component: FormulationEditComponent;
  let fixture: ComponentFixture<FormulationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulationEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
