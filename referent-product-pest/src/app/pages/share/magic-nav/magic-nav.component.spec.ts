import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicNavComponent } from './magic-nav.component';

describe('MagicNavComponent', () => {
  let component: MagicNavComponent;
  let fixture: ComponentFixture<MagicNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagicNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MagicNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
