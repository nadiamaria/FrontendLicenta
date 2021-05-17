import { TestBed } from '@angular/core/testing';

import { RoleGuardOwnerGuard } from './role-guard-owner.guard';

describe('RoleGuardOwnerGuard', () => {
  let guard: RoleGuardOwnerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleGuardOwnerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
