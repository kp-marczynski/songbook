import { TestBed } from '@angular/core/testing';

import { CurrentSongSharePopoverService } from './current-song-share-popover.service';

describe('CurrentSongSharePopoverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentSongSharePopoverService = TestBed.get(CurrentSongSharePopoverService);
    expect(service).toBeTruthy();
  });
});
