import { TestBed } from '@angular/core/testing';

import { UsageRecordStoreService } from './usage-record-store.service';

describe('UsageRecordStoreService', () => {
  let service: UsageRecordStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsageRecordStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
