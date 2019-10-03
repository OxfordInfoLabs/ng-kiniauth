import { Injectable } from '@angular/core';
import { KinibindRequestService } from 'ng-kinibind';

@Injectable({
    providedIn: 'root'
})
export class PackagedProductService {

    constructor(private kbRequest: KinibindRequestService) {
    }



}
