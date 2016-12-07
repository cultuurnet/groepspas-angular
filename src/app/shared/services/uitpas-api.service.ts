import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { GroupPassInfo } from "../../group-pass-info/group-pass-info";
import { config } from '../../../config';

@Injectable()
export class UitpasApiService {

  constructor (private http: Http) {
  }

  getGroupPassInfo(uitpasNumber : string) : Observable<GroupPassInfo> {
    return this.http.get(config.apiUrl + uitpasNumber)
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

    return Observable.throw(errMsg);
  }

}