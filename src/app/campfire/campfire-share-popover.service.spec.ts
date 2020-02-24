import { TestBed } from '@angular/core/testing';

import { CampfireSharePopoverService } from './campfire-share-popover.service';

describe('CampfireSharePopoverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampfireSharePopoverService = TestBed.get(CampfireSharePopoverService);
    expect(service).toBeTruthy();
  });
});
