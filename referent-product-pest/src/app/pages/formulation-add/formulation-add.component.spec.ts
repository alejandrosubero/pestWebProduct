import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulationAddComponent } from './formulation-add.component';

describe('FormulationAddComponent', () => {
  let component: FormulationAddComponent;
  let fixture: ComponentFixture<FormulationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulationAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
