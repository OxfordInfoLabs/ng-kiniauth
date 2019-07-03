import { Injectable } from '@angular/core';
import { KiniAuthModuleConfig } from '../../ng-kiniauth.module';

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    constructor(public config: KiniAuthModuleConfig) {
    }

    public constructHttpURL(url) {
        if (this.config) {
            return this.config.httpURL + url;
        }
        return url;
    }
}
