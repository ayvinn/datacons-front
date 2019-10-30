import { TestBed } from '@angular/core/testing';

import { ServiceinterventionService } from './serviceintervention.service';

describe('ServiceinterventionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceinterventionService = TestBed.get(ServiceinterventionService);
    expect(service).toBeTruthy();
  });
});
