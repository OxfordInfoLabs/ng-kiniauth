import { Component, EventEmitter, Input } from '@angular/core';
import { KinibindModel } from 'ng-kinibind';
import { ContactService } from '../../services/contact.service';

@Component({
    selector: 'ka-address-book',
    templateUrl: './address-book.component.html',
    styleUrls: ['./address-book.component.sass']
})
export class AddressBookComponent {

    @Input() editContactURL: string;

    public contacts: KinibindModel = new KinibindModel();
    public reload: EventEmitter<boolean> = new EventEmitter<boolean>();
    public contactLoading;

    constructor(private contactService: ContactService) {
    }

    public deleteContact(contactId) {
        const message = 'Are you sure you would like to delete this contact?';
        if (window.confirm(message)) {
            this.contactService.deleteContact(contactId).then(() => {
                this.reload.next(true);
            });
        }
    }

    public makeDefault(contactId) {
        this.contactService.setDefaultContact(contactId).then(() => {
            this.reload.next(true);
        });
    }

}
