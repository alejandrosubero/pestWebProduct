import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixTechnicalNotesComponent } from './mix-technical-notes.component';

describe('MixTechnicalNotesComponent', () => {
  let component: MixTechnicalNotesComponent;
  let fixture: ComponentFixture<MixTechnicalNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixTechnicalNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MixTechnicalNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
