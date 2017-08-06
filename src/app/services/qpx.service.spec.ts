import { TestBed, inject } from '@angular/core/testing';

import { QpxService } from './qpx.service';

describe('QpxServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QpxService]
    });
  });

  it('should be created', inject([QpxService], (service: QpxService) => {
    expect(service).toBeTruthy();
  }));
});
