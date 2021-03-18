import { TestBed } from '@angular/core/testing';

import { EnviartokenInterceptor } from './enviartoken.interceptor';

describe('EnviartokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EnviartokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: EnviartokenInterceptor = TestBed.inject(EnviartokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
