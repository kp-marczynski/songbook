import { TestBed } from '@angular/core/testing';

import { SongIndexService } from './song-index.service';

describe('SongIndexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongIndexService = TestBed.get(SongIndexService);
    expect(service).toBeTruthy();
  });
});
