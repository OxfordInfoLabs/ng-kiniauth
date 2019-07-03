import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { BaseComponent } from '../../base-component';

@Component({
    selector: 'ka-edit-mobile',
    templateUrl: './edit-mobile.component.html',
    styleUrls: ['./edit-mobile.component.sass']
})
export class EditMobileComponent extends BaseComponent implements OnInit {

    @Output('saved') saved: EventEmitter<any> = new EventEmitter();

    public newMobile = '';
    public currentPassword = '';
    public saveError: string;

    public user: any;

    constructor(public kcAuthService: AuthenticationService) {
        super(kcAuthService);
    }

    ngOnInit() {
        super.ngOnInit();
        return this.authService.getLoggedInUser().then(user => {
            this.user = user;
        });
    }

    public saveMobileNumber() {
        this.authService.validateUserPassword(this.user.emailAddress, this.currentPassword)
            .then(res => {
                if (res) {
                    this.saveError = '';
                    this.authService.changeUserMobile(this.newMobile, this.currentPassword)
                        .then(user => {
                            this.user = user;
                            this.saved.emit(user);
                        });
                } else {
                    this.saveError = 'Password incorrect. Mobile number has not been updated.';
                }
            });
    }

}
