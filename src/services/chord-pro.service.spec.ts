import { TestBed } from '@angular/core/testing';

import { ChordProService } from './chord-pro.service';

describe('ChordProService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChordProService = TestBed.get(ChordProService);
    expect(service).toBeTruthy();
  });
});
