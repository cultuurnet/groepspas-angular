import {NgModule, APP_INITIALIZER} from '@angular/core';
import {enableProdMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';
import {StringToDatePipe} from './string-to-date.pipe';
import {AppComponent} from './app.component';
import {routing, appRoutingProviders} from './app.routing';
import {GroupPassInfoComponent} from './group-pass-info/components/group-pass-info.component';
import {UitpasApiService} from './shared/services/uitpas-api.service';

if (process.env && process.env.ENV == 'production') {
    enableProdMode();
}

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
        routing,
    ],
    providers: [
        appRoutingProviders,
        UitpasApiService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule {



}
