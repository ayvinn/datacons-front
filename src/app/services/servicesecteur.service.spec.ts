import { TestBed } from '@angular/core/testing';

import { ServicesecteurService } from './servicesecteur.service';

describe('ServicesecteurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicesecteurService = TestBed.get(ServicesecteurService);
    expect(service).toBeTruthy();
  });
});
