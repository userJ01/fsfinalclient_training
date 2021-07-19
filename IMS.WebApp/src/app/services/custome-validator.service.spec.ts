import { TestBed } from '@angular/core/testing';

import { CustomeValidatorService } from './custome-validator.service';

describe('CustomeValidatorService', () => {
  let service: CustomeValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomeValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
