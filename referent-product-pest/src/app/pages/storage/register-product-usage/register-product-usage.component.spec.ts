import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProductUsageComponent } from './register-product-usage.component';

describe('RegisterProductUsageComponent', () => {
  let component: RegisterProductUsageComponent;
  let fixture: ComponentFixture<RegisterProductUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterProductUsageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterProductUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
