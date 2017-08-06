import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';


// todo: get api key from backend

@Injectable()
export class QpxService {
    constructor(private _http:Http) {
    }
    searchReq:any
    public getTrip(searchReq) {
        const API_KEY = 'AIzaSyCqyP4YVW0J0ikH8h6sNPtVL7ldAHKuCSU';
        const URL = 'https://www.googleapis.com/qpxExpress/v1/trips/search';
        let body = JSON.stringify(searchReq);
        let headers = new Headers();
        headers.set('Content-Type', 'application/json; charset=utf-8');

        let search = new URLSearchParams();
        search.set('key', API_KEY);
        return this._http
            .post(URL, '', {
                headers: headers,
                search: search,
                body: body,
            })
            .map((res:Response) => res.json());
    }
}

