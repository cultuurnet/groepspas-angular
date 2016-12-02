import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { GroupPassInfo } from "../../group-pass-info/group-pass-info";
import { ConfigService } from '../../config/config.service';

@Injectable()
export class UitpasApiService {

  config: any;
  private groupPassInfoUrl = 'http://vagrant.loc/web/group_pass/';

  constructor (private http: Http, private configSrvc: ConfigService) {
    this.config = this.configSrvc.config;
  }

  getGroupPassInfo(uitpasNumber : string) : Observable<GroupPassInfo> {
    return this.http.get(this.config.apiUrl + uitpasNumber)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}