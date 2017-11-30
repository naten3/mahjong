import { AjaxResponse } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs/Observable';
import * as queryString from 'query-string';

export default class HttpService {
  static get(url: string, queryArgs: object = {}): Observable<AjaxResponse> {
    const newUrl = encodeURI(url);
    return this.request(`${newUrl}?${queryString.stringify(queryArgs)}`, 'GET');
  }

  static post(url: string, body?: object): Observable<AjaxResponse> {
    return this.request(url, 'POST', body);
  }

  static put(url: string, body?: object): Observable<AjaxResponse> {
    return this.request(url, 'PUT', body);
  }

  static delete(url: string, body?: object): Observable<AjaxResponse> {
    return this.request(url, 'DELETE', body);
  }

  static request(url: string, method: string, body?: object): Observable<AjaxResponse> {
    return ajax({
      url,
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json',
      crossDomain: true,
      body: JSON.stringify(body)
    })
      .map((res) => res)
      .catch(err => {
        // tslint:disable-next-line:no-console
        return Observable.throw(err);
      });
  }
}
