import {Component, Inject} from '@angular/core';
import {UitpasApiService} from "../../shared/services/uitpas-api.service";
import {GroupPassInfo} from "../group-pass-info";

export const EXCHANGE_INFO = {
    'YEAR': 'Maximimum {total} keer per jaar inwisselbaar',
    'MONTH': 'Maximimum {total} keer per maand inwisselbaar',
    'WEEK': 'Maximimum {total} keer per week inwisselbaar',
    'DAY': 'Maximimum {total} keer per dag inwisselbaar',
    'QUARTER': 'Maximimum {total} keer per kwartaal inwisselbaar',
    'ABSOLUTE': 'Altijd inwisselbaar'
}

@Component({
    selector: '#group-pass-info',
    template: require('./group-pass-info.component.html'),
})

export class GroupPassInfoComponent {

    groupPassInfo: GroupPassInfo;
    groupPassNumber: string;
    groupPassError : string;
    searching : boolean;
    constructor(private uitpasApiService: UitpasApiService) {
        this.searching = false;
    }

    /**
     * Load the grouppass info.
     */
    getGroupPassInfo() {
        this.searching = true;
        this.groupPassError = null;
        this.groupPassInfo = null;
        this.uitpasApiService.getGroupPassInfo(this.groupPassNumber)
            .subscribe(
                info => this.groupPassInfo = info,
                error => this.setError(error),
                () => this.searching = false
        );

    }

    /**
     * Set the error to shown.
     */
    setError(error : any) {
        if (error.code) {
            this.groupPassError = error.message;
        }
        else {
            this.groupPassError = "Dit is geen geldig UiTPas-nummer."
        }
        this.searching = false
    }

    /**
     * Get the exchange info to show.
     * @returns {string}
     */
    getExchangeInfoForCoupon(coupon: any) {

        if (coupon.exchangeConstraint) {

           return  EXCHANGE_INFO[coupon.exchangeConstraint.periodType].replace('{total}', coupon.exchangeConstraint.periodVolume);
        }

        return '';
    }

}
