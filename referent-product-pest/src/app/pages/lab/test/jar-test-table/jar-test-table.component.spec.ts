import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JarTestTableComponent } from './jar-test-table.component';

describe('JarTestTableComponent', () => {
  let component: JarTestTableComponent;
  let fixture: ComponentFixture<JarTestTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JarTestTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JarTestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
