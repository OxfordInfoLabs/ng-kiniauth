import { Injectable, Optional } from '@angular/core';
import { BaseService } from './base.service';
import { KiniAuthModuleConfig } from '../../ng-kiniauth.module';
import { KinibindRequestService } from 'ng-kinibind';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService extends BaseService {

    public authUser: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private kbRequest: KinibindRequestService,
                @Optional() config: KiniAuthModuleConfig) {
        super(config);
    }

    public getLoggedInUser(): any {
        return this.kbRequest.makeGetRequest(this.constructHttpURL('/admin/user')).toPromise()
            .then(res => {
                if (res) {
                    this.setSessionUser(res);
                    return res;
                }
                return null;
            });
    }

    public login(username: string, password: string) {
        const request = this.constructHttpURL(`/guest/auth/login?emailAddress=${username}&password=${password}`);
        return this.kbRequest.makeGetRequest(request).toPromise().then((user: any) => {

            if (user === 'REQUIRES_2FA') {
                return user;
            } else {
                return this.setSessionUser(user);
            }
        });
    }

    public generateTwoFactorSettings() {
        return this.kbRequest.makeGetRequest(this.constructHttpURL('/guest/auth/twoFactorSettings'))
            .toPromise()
    }

    public authenticateNewTwoFactor(code, secret) {
        return this.kbRequest.makeGetRequest(
            this.constructHttpURL('/guest/auth/newTwoFactor'),
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
        const url = this.constructHttpURL(`/guest/auth/twoFactor?code=${code}`);
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
        const url = this.constructHttpURL('/guest/auth/disableTwoFA');
        return this.kbRequest.makeGetRequest(url).toPromise().then(user => {
            this.setSessionUser(user);
        });
    }

    public doesUserExist(username: string) {
        return Promise.resolve(true);
    }

    public emailAvailable(emailAddress) {
        return this.kbRequest.makeGetRequest(
            this.constructHttpURL(`/guest/auth/emailExists?emailAddress=${emailAddress}`)
        ).toPromise().then(res => {
            return !res;
        });
    }

    public validateUserPassword(emailAddress, password) {
        return this.kbRequest.makeGetRequest(this.constructHttpURL('/guest/auth/validatePassword'), {
            params: {
                emailAddress,
                password
            }
        }).toPromise();
    }

    public changeUserEmailAddress(newEmailAddress, password) {
        return this.kbRequest.makeGetRequest(this.constructHttpURL('/admin/user/changeEmail'), {
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
        return this.kbRequest.makeGetRequest(this.constructHttpURL('/admin/user/changeBackupEmail'), {
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
        return this.kbRequest.makeGetRequest(this.constructHttpURL('/admin/user/changeMobile'), {
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
        return this.kbRequest.makeGetRequest(this.constructHttpURL('/guest/auth/logout')).toPromise();
    }

    public setSessionUser(user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        this.authUser.next(user);
        return user;
    }
}
