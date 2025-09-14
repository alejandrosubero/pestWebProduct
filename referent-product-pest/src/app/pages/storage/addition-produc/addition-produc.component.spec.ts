import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionProducComponent } from './addition-produc.component';

describe('AdditionProducComponent', () => {
  let component: AdditionProducComponent;
  let fixture: ComponentFixture<AdditionProducComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionProducComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionProducComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
