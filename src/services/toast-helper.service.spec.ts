import { TestBed } from '@angular/core/testing';

import { ToastHelperService } from './toast-helper.service';

describe('ToastHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToastHelperService = TestBed.get(ToastHelperService);
    expect(service).toBeTruthy();
  });
});
