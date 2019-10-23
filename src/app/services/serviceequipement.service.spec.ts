import { TestBed } from '@angular/core/testing';

import { ServiceequipementService } from './serviceequipement.service';

describe('ServiceequipementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceequipementService = TestBed.get(ServiceequipementService);
    expect(service).toBeTruthy();
  });
});
