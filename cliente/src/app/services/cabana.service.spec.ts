import { TestBed } from '@angular/core/testing';

import { CabanaService } from './cabana.service';

describe('CabanaService', () => {
  let service: CabanaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CabanaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
