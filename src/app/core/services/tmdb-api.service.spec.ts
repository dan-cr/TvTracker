import { TestBed } from '@angular/core/testing';

import { TmdbApiService } from './tmdb-api.service';

describe('TmdbApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TmdbApiService = TestBed.get(TmdbApiService);
    expect(service).toBeTruthy();
  });
});
