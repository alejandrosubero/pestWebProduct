import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalNotesListComponent } from './technical-notes-list.component';

describe('TechnicalNotesListComponent', () => {
  let component: TechnicalNotesListComponent;
  let fixture: ComponentFixture<TechnicalNotesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalNotesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TechnicalNotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
