import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { NgKinibindModule } from 'ng-kinibind';

describe('ContactService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            NgKinibindModule
        ]
    }));

  it('should be created', () => {
    const service: ContactService = TestBed.get(ContactService);
    expect(service).toBeTruthy();
  });
});
