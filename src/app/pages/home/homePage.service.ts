import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../../appSettings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HomePageService {
    private baseApiUrl: string = AppSettings.API_ENDPOINT;

    constructor(
        private _http: Http,
    ) { }
    
    getLatestBlocks() : Observable<any> {
        const url   = this.baseApiUrl + 'blocks/latest?limit=10';
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        return this._http.get(url, {headers})
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    getLatestNetworkHashRates() : Observable<any> {
        const url   = this.baseApiUrl + 'network/hashrates?limit=20';
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        return this._http.get(url, {headers})
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    getNetworkPrice() : Observable<any> {
        const url   = this.baseApiUrl + 'network/price';
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        return this._http.get(url, {headers})
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    getNetworkInfo() : Observable<any> {
        const url   = this.baseApiUrl + 'network/info';
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        return this._http.get(url, {headers})
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }


    getClientInfo() : Observable<any> {
        const url   = this.baseApiUrl + 'client/info';
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        return this._http.get(url, {headers})
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    getSearchItemType(param: string) : Observable<any> {
        const url   = this.baseApiUrl + 'search/' + param;
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        return this._http.get(url, {headers})
            .map(res => this.extractData(res))
            .catch(this.handleError);
    }

    getBootstrapLink() : Observable<any> {
        const url   = this.baseApiUrl + 'network/bootstrap';
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        return this._http.get(url, {headers})
            .map(res => '' + this.baseApiUrl.substring(0,this.baseApiUrl.length - 5) + this.extractData(res).url)
            .catch(this.handleError);
    }

    getHashrates() : Observable<any> {
        const url   = this.baseApiUrl + 'network/hashrates?limit=25';
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        return this._http.get(url, {headers})
            .map(res => this.extractData(res) )
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
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
        return Observable.throw(error);
    }

}
