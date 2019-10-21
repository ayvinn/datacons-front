import { TestBed } from '@angular/core/testing';

import { ServicecategorieService } from './servicecategorie.service';

describe('ServicecategorieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicecategorieService = TestBed.get(ServicecategorieService);
    expect(service).toBeTruthy();
  });
});
