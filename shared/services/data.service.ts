import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ICovidStats } from 'shared/interfaces/interfaces';


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
        return this.http.get<ICovidStats[]>(`${this.API_URL}/statistics`)
            .pipe(
                map(res => {
                    const stats = res as ICovidStats[];
                    return stats;
                }),
                catchError(this.handleError)
            );
    }

    getCovidStatsByCountry(country: string): Observable<ICovidStats[]> {
        return this.http.get<ICovidStats[]>(`${this.API_URL}/statistics?country=${country}`)
            .pipe(
                map(stats => {
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
        }
        return throwError(() => error || 'Node.js server error');
    }

}