import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankMixChecklistComponent } from './tank-mix-checklist.component';

describe('TankMixChecklistComponent', () => {
  let component: TankMixChecklistComponent;
  let fixture: ComponentFixture<TankMixChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TankMixChecklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TankMixChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
