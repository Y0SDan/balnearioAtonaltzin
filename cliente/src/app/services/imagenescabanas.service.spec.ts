import { TestBed } from '@angular/core/testing';

import { ImagenescabanasService } from './imagenescabanas.service';

describe('ImagenescabanasService', () => {
  let service: ImagenescabanasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenescabanasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
