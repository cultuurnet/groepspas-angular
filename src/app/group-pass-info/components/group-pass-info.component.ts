import {Component, Inject} from '@angular/core';
import {UitpasApiService} from "../../shared/services/uitpas-api.service";
import {GroupPassInfo} from "../group-pass-info";


@Component({
    selector: '#group-pass-info',
    template: require('./group-pass-info.component.html'),
})

export class GroupPassInfoComponent {

    groupPassInfo: GroupPassInfo;
    groupPassNumber: string;
    groupPassError : string;
    constructor(private uitpasApiService: UitpasApiService) {}

    getGroupPassInfo() {
        this.groupPassError = null;
        this.groupPassInfo = null;
        this.uitpasApiService.getGroupPassInfo(this.groupPassNumber)
            .subscribe(
                info => this.groupPassInfo = info,
                error => this.setError(error)
        );

    }

    setError(error : any) {
        this.groupPassError = "Er kan geen pas worden gevonden voor dit nummer."
    }

}
