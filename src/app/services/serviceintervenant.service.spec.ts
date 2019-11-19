import { TestBed } from '@angular/core/testing';

import { ServiceintervenantService } from './serviceintervenant.service';

describe('ServiceintervenantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceintervenantService = TestBed.get(ServiceintervenantService);
    expect(service).toBeTruthy();
  });
});
