import { TestBed } from '@angular/core/testing';

import { SongDetailsService } from './song-details.service';

describe('SongDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongDetailsService = TestBed.get(SongDetailsService);
    expect(service).toBeTruthy();
  });
});
