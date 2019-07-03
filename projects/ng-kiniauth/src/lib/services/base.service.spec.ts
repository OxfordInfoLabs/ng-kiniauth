import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';
import { KiniAuthModuleConfig } from '../../ng-kiniauth.module';

describe('BaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
        KiniAuthModuleConfig
    ]
  }));

  it('should be created', () => {
    const service: BaseService = TestBed.get(BaseService);
    expect(service).toBeTruthy();
  });
});
