import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInfoSheetComponent } from './search-info-sheet.component';

describe('SearchInfoSheetComponent', () => {
  let component: SearchInfoSheetComponent;
  let fixture: ComponentFixture<SearchInfoSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInfoSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchInfoSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
