import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AUTHGuard } from './auth.guard';

describe('AUTHGuard', () => {
  let guard: AUTHGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    guard = TestBed.inject(AUTHGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
