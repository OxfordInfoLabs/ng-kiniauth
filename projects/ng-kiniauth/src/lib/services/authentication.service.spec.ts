import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { NgKinibindModule } from 'ng-kinibind';
import { KiniAuthModuleConfig, NgKiniAuthModule } from '../../ng-kiniauth.module';

describe('AuthenticationService', () => {
    const config: KiniAuthModuleConfig = {
        guestHttpURL: 'string',
        accessHttpURL: 'string'
    };
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            NgKinibindModule
        ],
        providers: [
            { provide: KiniAuthModuleConfig, useValue: config }
        ]
    }));

    it('should be created ', () => {
        const service: AuthenticationService = TestBed.get(AuthenticationService);
        expect(service).toBeTruthy();
    });
});
