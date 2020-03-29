import { TestBed } from '@angular/core/testing';

import { CampfireService } from './campfire.service';

describe('CampfireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampfireService = TestBed.get(CampfireService);
    expect(service).toBeTruthy();
  });
});
