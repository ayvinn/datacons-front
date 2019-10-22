import { TestBed } from '@angular/core/testing';

import { ServicedemandeurService } from './servicedemandeur.service';

describe('ServicedemandeurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicedemandeurService = TestBed.get(ServicedemandeurService);
    expect(service).toBeTruthy();
  });
});
