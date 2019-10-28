import { TestBed } from '@angular/core/testing';

import { ServicesousequipementService } from './servicesousequipement.service';

describe('ServicesousequipementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesousequipementService = TestBed.get(ServicesousequipementService);
    expect(service).toBeTruthy();
  });
});
