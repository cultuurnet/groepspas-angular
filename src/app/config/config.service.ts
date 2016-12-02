import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConfigService {

    config: any;

    constructor(private http: Http) {}

    load() {
        return new Promise((resolve) => {
            this.http.get('src/app/config/config.json').map(res => res.json())
                .subscribe(config => {
                    this.config = config;
                    resolve();
                });
        });
    }

}