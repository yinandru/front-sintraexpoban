import { TestBed } from '@angular/core/testing';

import { DirectivosService } from './directivos.service';

describe('DirectivosService', () => {
  let service: DirectivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
