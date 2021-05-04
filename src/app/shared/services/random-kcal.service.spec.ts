import { TestBed } from '@angular/core/testing';

import { RandomKcalService } from './random-kcal.service';

describe('RandomKcalService', () => {
  let service: RandomKcalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomKcalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
