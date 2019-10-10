import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { KinibindModel, KinibindRequestService } from 'ng-kinibind';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'ka-contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.sass']
})
export class ContactDetailsComponent implements OnInit {

    @Input() source: string;
    @Input() sourceParams: any;
    @Input() store: string;
    @Input() storeParams: any;
    @Input() storeObjectParam: string;
    @Input() savedRoute: any;
    @Input() readOnlyAddress = true;
    @Input() hiddenFields: any = [];

    @ViewChild('contactForm') public contactForm: NgForm;

    @Output() loaded: EventEmitter<any> = new EventEmitter<any>();
    @Output() contactSaved: EventEmitter<any> = new EventEmitter<any>();

    public contact: KinibindModel = new KinibindModel();
    public addressId: EventEmitter<string> = new EventEmitter();
    public hide: any = {};
    public findAddress = false;
    public enterManually = false;
    public searchResults = false;
    public newContact = false;
    public enterVerificationCode = false;
    public verificationRequired: any = true;
    public emailStatus = '';
    public authCodeError = false;
    public validTel = true;
    public validFax = true;
    public telObj: any = {};
    public faxObj: any = {};
    public Object = Object;
    public lodash = _;

    constructor(private kbRequest: KinibindRequestService,
                private location: Location,
                private router: Router,
                private authenticationService: AuthenticationService) {

    }

    ngOnInit() {
        if (_.isArray(this.hiddenFields) && this.hiddenFields.length) {
            _.forEach(this.hiddenFields, field => {
                this.hide[field] = true;
            });
        }

        this.addressId.subscribe(addressId => {
            if (addressId) {
                this.kbRequest.makeGetRequest(`/internal/application/address/${addressId}`)
                    .toPromise().then((address: any) => {
                    this.contact.data.organisation = address.company;
                    this.contact.data.street1 = address.line1;
                    this.contact.data.street2 = address.line2;
                    this.contact.data.city = address.city;
                    this.contact.data.county = address.province ? address.province : address.city;
                    this.contact.data.postcode = address.postalCode;
                    this.contact.data.country = address.countryIso2;
                    this.contactForm.form.markAsDirty();
                });
            }
        });
    }

    public validationChange() {
        const validationFields = this.contact.data.additionalDataDefinition;
        _.each(validationFields, (field) => {
            _.each(field.depends, (depends, dKey) => {
                field.dependsMatch = depends.indexOf(this.contact.data.additionalData[dKey]);
            });
        });
    }

    public sourceLoaded() {
        this.emailStatus = this.contact.data.emailVerifiedStatus;

        if (!this.contact.data.additionalData || !_.isPlainObject(this.contact.data.additionalData)) {
            this.contact.data.additionalData = {};
        }

        this.validationChange();

        this.loaded.emit(true);
    }

    public getTelNumber(event) {
        this.contact.data.telephoneExt = this.telObj.intlTelInput('getExtension');
        const number: string = this.telObj.intlTelInput('getNumber', 2);
        this.contact.data.telephone = number.split(' x').shift();
        this.contactForm.form.markAsDirty();
    }

    public telCountryChange(event) {
        this.contact.data.telephoneDiallingCode = '+' + event.dialCode;
        this.contactForm.form.markAsDirty();
    }

    public telInputObject(obj) {
        this.telObj = obj;
        if (this.contact.data.fullTelephoneNumber) {
            obj.intlTelInput('setNumber', '+' + this.contact.data.fullTelephoneNumber, 2);
        } else {
            obj.intlTelInput('setCountry', 'gb');
        }
    }

    public getFaxNumber(event) {
        this.contact.data.faxExt = this.faxObj.intlTelInput('getExtension');
        const number: string = this.faxObj.intlTelInput('getNumber', 2);
        this.contact.data.fax = number.split(' x').shift();
        this.contactForm.form.markAsDirty();
    }

    public faxCountryChange(event) {
        this.contact.data.faxDiallingCode = '+' + event.dialCode;
        this.contactForm.form.markAsDirty();
    }

    public faxInputObject(obj) {
        this.faxObj = obj;
        if (this.contact.data.fullFaxNumber) {
            obj.intlTelInput('setNumber', '+' + this.contact.data.fullFaxNumber, 2);
        } else {
            obj.intlTelInput('setCountry', 'gb');
        }
    }

    public isItemVerified(dataType, footprint) {
        // this.authenticationService.isItemVerified(dataType, footprint).then((res: any) => {
        //     this.emailStatus = res ? 'Valid' : 'Pending';
        // });
    }

    public verifyEmail(emailAddress) {
        // this.authenticationService.sendEmailVerification(emailAddress)
        //     .then(verification => {
        //         this.verificationRequired = verification;
        //         this.enterVerificationCode = true;
        //     });
    }

    public checkVerificationCode(checkCode) {
        // this.authenticationService.verifyEmail(checkCode).then((res: any) => {
        //     if (res === 1) {
        //         this.emailStatus = 'Valid';
        //         this.enterVerificationCode = false;
        //         this.authCodeError = false;
        //     } else {
        //         this.authCodeError = true;
        //     }
        // });
    }

    public hasTelError(valid) {
        this.validTel = valid;
    }

    public hasFaxError(valid) {
        this.validFax = valid;
    }

    public saved() {
        if (this.savedRoute) {
            if (this.savedRoute === 'BACK') {
                this.location.back();
            } else {
                this.router.navigate([this.savedRoute]);
            }
        } else {
            this.contactSaved.emit(this.contact.data);
        }
    }

}
