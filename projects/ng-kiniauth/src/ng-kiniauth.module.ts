import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgKinibindModule } from 'ng-kinibind';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountSummaryComponent } from './lib/views/account-summary/account-summary.component';
import { EditEmailComponent } from './lib/views/account-summary/edit-email/edit-email.component';
import { TwoFactorComponent } from './lib/views/account-summary/two-factor/two-factor.component';
import { LoginComponent } from './lib/views/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './lib/services/authentication.service';
import { InlineModalComponent } from './lib/views/inline-modal/inline-modal.component';
import { BaseComponent } from './lib/views/base-component';
import { EditBackupEmailComponent } from './lib/views/account-summary/edit-backup-email/edit-backup-email.component';
import { EditMobileComponent } from './lib/views/account-summary/edit-mobile/edit-mobile.component';

@NgModule({
    declarations: [
        AccountSummaryComponent,
        EditEmailComponent,
        TwoFactorComponent,
        LoginComponent,
        InlineModalComponent,
        BaseComponent,
        EditBackupEmailComponent,
        EditMobileComponent
    ],
    imports: [
        NgKinibindModule,
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        AccountSummaryComponent,
        EditEmailComponent,
        TwoFactorComponent,
        LoginComponent
    ]
})
export class NgKiniAuthModule {

    static forRoot(conf?: KiniAuthModuleConfig): ModuleWithProviders {
        return {
            ngModule: NgKiniAuthModule,
            providers: [
                { provide: KiniAuthModuleConfig, useValue: conf || {} }
            ]
        };
    }
}

export class KiniAuthModuleConfig {
    guestHttpURL: string;
    accessHttpURL: string;
}
