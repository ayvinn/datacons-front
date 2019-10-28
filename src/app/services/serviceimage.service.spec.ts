import { TestBed } from '@angular/core/testing';

import { ServiceimageService } from './serviceimage.service';

describe('ServiceimageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceimageService = TestBed.get(ServiceimageService);
    expect(service).toBeTruthy();
  });
});
