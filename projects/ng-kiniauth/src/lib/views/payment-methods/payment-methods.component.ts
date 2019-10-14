import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { KinibindModel, KinibindRequestService } from 'ng-kinibind';

@Component({
    selector: 'ka-payment-methods',
    templateUrl: './payment-methods.component.html',
    styleUrls: ['./payment-methods.component.sass']
})
export class PaymentMethodsComponent {

    @Input() environment: any;

    public paymentSources: KinibindModel = new KinibindModel([]);
    public reload: EventEmitter<boolean> = new EventEmitter<boolean>();
    public paymentLoading;
    public addPaymentMethod = false;

    constructor(private kbRequest: KinibindRequestService) {

    }

    public removeCard(cardId, index) {
        if (window.confirm('Are you sure you would like to delete this payment method?')) {
            this.paymentLoading = index;
            this.kbRequest.makeRequest(
                'GET',
                `/internal/account/removeStripeCard/${cardId}`
            ).toPromise().then(() => {
                this.reload.next(true);
                this.paymentLoading = null;
            }).catch(() => this.paymentLoading = null);
        }
    }

    public makeDefault(cardId, index) {
        this.paymentLoading = index;
        this.kbRequest.makeRequest(
            'GET',
            `/internal/account/defaultCard/${cardId}`
        ).toPromise().then(() => {
            this.reload.next(true);
            this.paymentLoading = null;
        }).catch(() => this.paymentLoading = null);
    }

}
