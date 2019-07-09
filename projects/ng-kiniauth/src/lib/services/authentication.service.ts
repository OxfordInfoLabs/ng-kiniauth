import { Injectable, Optional } from '@angular/core';
import { KiniAuthModuleConfig } from '../../ng-kiniauth.module';
import { KinibindRequestService } from 'ng-kinibind';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    public authUser: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private kbRequest: KinibindRequestService,
                private config: KiniAuthModuleConfig) {

    }

    public getLoggedInUser(): any {
        return this.kbRequest.makeGetRequest(this.config.accessHttpURL + '/user').toPromise()
            .then(res => {
                if (res) {
                    this.setSessionUser(res);
                    return res;
                }
                return null;
            });
    }

    public login(username: string, password: string) {
        const request = this.config.guestHttpURL + `/auth/login?emailAddress=${username}&password=${password}`;
        return this.kbRequest.makeGetRequest(request).toPromise().then((user: any) => {

            if (user === 'REQUIRES_2FA') {
                return user;
            } else {
                return this.setSessionUser(user);
            }
        });
    }

    public generateTwoFactorSettings() {
        return this.kbRequest.makeGetRequest(this.config.guestHttpURL + '/auth/twoFactorSettings')
            .toPromise()
    }

    public authenticateNewTwoFactor(code, secret) {
        return this.kbRequest.makeGetRequest(
            this.config.guestHttpURL + '/auth/newTwoFactor',
            {
                params: { code, secret }
            }
        ).toPromise().then(user => {
            if (user) {
                this.setSessionUser(user);
            }
            return user;
        });
    }

    public authenticateTwoFactor(code) {
        const url = this.config.guestHttpURL + `/auth/twoFactor?code=${code}`;
        return this.kbRequest.makeGetRequest(url).toPromise()
            .then(result => {
                if (result) {
                    sessionStorage.removeItem('pendingLoginSession');
                    return this.getLoggedInUser();
                } else {
                    throw(result);
                }
            });
    }

    public disableTwoFactor() {
        const url = this.config.guestHttpURL + '/auth/disableTwoFA';
        return this.kbRequest.makeGetRequest(url).toPromise().then(user => {
            this.setSessionUser(user);
        });
    }

    public doesUserExist(username: string) {
        return Promise.resolve(true);
    }

    public emailAvailable(emailAddress) {
        return this.kbRequest.makeGetRequest(
            this.config.guestHttpURL + `/auth/emailExists?emailAddress=${emailAddress}`
        ).toPromise().then(res => {
            return !res;
        });
    }

    public validateUserPassword(emailAddress, password) {
        return this.kbRequest.makeGetRequest(this.config.guestHttpURL + '/auth/validatePassword', {
            params: {
                emailAddress,
                password
            }
        }).toPromise();
    }

    public changeUserEmailAddress(newEmailAddress, password) {
        return this.kbRequest.makeGetRequest(this.config.accessHttpURL + '/user/changeEmail', {
            params: {
                newEmailAddress,
                password
            }
        }).toPromise().then(user => {
            this.setSessionUser(user);
            return user;
        });
    }

    public changeUserBackEmailAddress(newEmailAddress, password) {
        return this.kbRequest.makeGetRequest(this.config.accessHttpURL + '/user/changeBackupEmail', {
            params: {
                newEmailAddress,
                password
            }
        }).toPromise().then(user => {
            this.setSessionUser(user);
            return user;
        });
    }

    public changeUserMobile(newMobile, password) {
        return this.kbRequest.makeGetRequest(this.config.accessHttpURL + '/user/changeMobile', {
            params: {
                newMobile,
                password
            }
        }).toPromise().then(user => {
            this.setSessionUser(user);
            return user;
        });
    }

    public getGoogleAuthSettings() {
        return true;
    }

    public logout() {
        this.authUser.next(null);
        sessionStorage.clear();
        return this.kbRequest.makeGetRequest(this.config.guestHttpURL + '/auth/logout').toPromise();
    }

    public setSessionUser(user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        this.authUser.next(user);
        return user;
    }
}
