import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { NgKinibindModule } from 'ng-kinibind';

describe('AuthenticationService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            NgKinibindModule
        ]
    }));

    it('should be created ', () => {
        const service: AuthenticationService = TestBed.get(AuthenticationService);
        expect(service).toBeTruthy();
    });
});
