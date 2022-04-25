import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const API_KEY= environment.API_KEY as string;
    // add the header to the cloned request
    const authReq = req.clone({headers: req.headers.set('X-Rapidapi-Key', API_KEY)});

    return next.handle(authReq);
  }
}