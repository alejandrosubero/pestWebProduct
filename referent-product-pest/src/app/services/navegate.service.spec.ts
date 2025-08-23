import { TestBed } from '@angular/core/testing';

import { NavegateService } from './navegate.service';

describe('NavegateService', () => {
  let service: NavegateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavegateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
