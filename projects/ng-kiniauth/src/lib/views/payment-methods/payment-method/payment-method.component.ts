import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ka-payment-method',
    templateUrl: './payment-method.component.html',
    styleUrls: ['./payment-method.component.sass']
})
export class PaymentMethodComponent implements OnInit {

    @Input() environment: any;

    constructor() {
    }

    ngOnInit() {
    }

}
