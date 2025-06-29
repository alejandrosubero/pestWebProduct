import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulationsListComponent } from './formulations-list.component';

describe('FormulationsListComponent', () => {
  let component: FormulationsListComponent;
  let fixture: ComponentFixture<FormulationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulationsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
