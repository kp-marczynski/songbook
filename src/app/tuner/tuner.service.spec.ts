import { TestBed } from '@angular/core/testing';

import { TunerService } from './tuner.service';

describe('TunerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TunerService = TestBed.get(TunerService);
    expect(service).toBeTruthy();
  });
});
