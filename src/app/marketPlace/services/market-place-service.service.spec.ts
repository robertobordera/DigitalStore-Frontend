import { TestBed } from '@angular/core/testing';

import { MarketPlaceServiceService } from './market-place-service.service';

describe('MarketPlaceServiceService', () => {
  let service: MarketPlaceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketPlaceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
