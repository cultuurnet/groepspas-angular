import {NgModule, APP_INITIALIZER} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormBuilder, Validators} from '@angular/forms'
import {StringToDatePipe} from './string-to-date.pipe';
import {AppComponent} from './app.component';
import {routing, appRoutingProviders} from './app.routing';

// Components
import {GroupPassInfoComponent} from './group-pass-info/components/group-pass-info.component';

// Services
import {UitpasApiService} from './shared/services/uitpas-api.service';
import {ConfigService} from "./config/config.service";

@NgModule({
    declarations: [
        AppComponent,
        GroupPassInfoComponent,
        StringToDatePipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing
    ],
    providers: [
        appRoutingProviders,
        UitpasApiService,
        ConfigService,
        { provide: APP_INITIALIZER,
            useFactory: (config: ConfigService) => () => config.load(),
            deps: [ConfigService],
            multi: true }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
