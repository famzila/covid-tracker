import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ICovidStats } from 'shared/interfaces/interfaces';

// import { ICustomer, IOrder, IState, IPagedResults, IApiResponse } from '../../shared/interfaces';
// import { UtilitiesService } from './utilities.service';

@Injectable()
export class DataService {
    API_URL = "https://covid-193.p.rapidapi.com";

    constructor(private http: HttpClient) {  }

    getCountries(): Observable<string[]> {
        return this.http.get<string[]>(`${this.API_URL}/countries`)
            .pipe(
                map(res => {
                    return res
                }),
                catchError(this.handleError)
            );
    }

    getCovidStats(): Observable<ICovidStats[]> {
        return this.http.get<ICovidStats[]>(`${this.API_URL}/statistics?country=all`)
            .pipe(
                map(res => {
                    const stats = res as ICovidStats[];
                    return stats;
                }),
                catchError(this.handleError)
            );
    }

    getCovidStatsByCountry(country: string): Observable<ICovidStats[]> {
        return this.http.get<ICovidStats[]>(`${this.API_URL}/statistics?countries?search=${country}`)
            .pipe(
                map(stats => {
                    // this.calculateCustomersOrderTotal(customers);
                    return stats;
                }),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return throwError(() => errMessage);
            // Use the following instead if using lite-server
            // return Observable.throw(err.text() || 'backend server error');
        }
        return throwError(() => error || 'Node.js server error');
    }

//     GET /countries HTTP/1.1
// X-Rapidapi-Host: covid-193.p.rapidapi.com
// X-Rapidapi-Key: f6ac3734d4mshc3e97ae05773fa0p15abfcjsn4cd3b0a5cfd3
// Host: covid-193.p.rapidapi.com

    // Not using now but leaving since they show how to create
    // and work with custom observables

    // Would need following import added:
    // import { Observer } from 'rxjs';

    // createObservable(data: any): Observable<any> {
    //     return Observable.create((observer: Observer<any>) => {
    //         observer.next(data);
    //         observer.complete();
    //     });
    // }
    

}