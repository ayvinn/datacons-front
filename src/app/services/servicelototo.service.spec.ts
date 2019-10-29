import { TestBed } from '@angular/core/testing';

import { ServicelototoService } from './servicelototo.service';

describe('ServicelototoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicelototoService = TestBed.get(ServicelototoService);
    expect(service).toBeTruthy();
  });
});
