import { TestBed } from '@angular/core/testing';

import { PackagedProductService } from './packaged-product.service';
import { NgKinibindModule } from 'ng-kinibind';

describe('PackagedProductService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            NgKinibindModule
        ]
    }));

  it('should be created', () => {
    const service: PackagedProductService = TestBed.get(PackagedProductService);
    expect(service).toBeTruthy();
  });
});
