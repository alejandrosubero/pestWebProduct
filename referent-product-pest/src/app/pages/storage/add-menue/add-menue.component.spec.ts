import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenueComponent } from './add-menue.component';

describe('AddMenueComponent', () => {
  let component: AddMenueComponent;
  let fixture: ComponentFixture<AddMenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMenueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
