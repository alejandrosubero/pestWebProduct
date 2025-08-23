import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageProductDetailComponent } from './storage-product-detail.component';

describe('StorageProductDetailComponent', () => {
  let component: StorageProductDetailComponent;
  let fixture: ComponentFixture<StorageProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageProductDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StorageProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
