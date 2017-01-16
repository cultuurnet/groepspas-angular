import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { GroupPassInfo } from "../../group-pass-info/group-pass-info";

export const API_ERROR_CODES = {
  'UNKNOWN_GROUPPASS': "UiTPas-nummer is geen groepspas."
}

@Injectable()
export class UitpasApiService {

  constructor (private http: Http) {
  }

  getGroupPassInfo(uitpasNumber : string) : Observable<GroupPassInfo> {
    return this.http.get(process.env.API_URL + 'group-pass/' + uitpasNumber)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {

    let message: string;
    let code: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      if (body.code && API_ERROR_CODES[body.code]) {
        message = API_ERROR_CODES[body.code];
        code = body.code;
      }
      else {
        const err = body.error || JSON.stringify(body);
        message = `${error.status} - ${error.statusText || ''} ${err}`;
        code = '';
      }


    } else {

      if (error.code && API_ERROR_CODES[error.code]) {
        message = API_ERROR_CODES[error.code];
        code = error.code;
      }
      else {
        message = error.message ? error.message : error.toString();
        code = '';
      }

    }

    return Observable.throw({
      code: code,
      message: message
    });
  }

}