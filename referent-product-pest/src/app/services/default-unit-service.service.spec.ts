import { TestBed } from '@angular/core/testing';

import { DefaultUnitServiceService } from './default-unit-service.service';

describe('DefaultUnitServiceService', () => {
  let service: DefaultUnitServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultUnitServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
