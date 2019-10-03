import { TestBed } from '@angular/core/testing';

import { PackagedProductService } from './packaged-product.service';

describe('PackagedProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PackagedProductService = TestBed.get(PackagedProductService);
    expect(service).toBeTruthy();
  });
});
