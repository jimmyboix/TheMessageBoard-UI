import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = this.authenticationService.currentUserValue;

        if (currentUser && currentUser.data.token) {
            const helper = new JwtHelperService();
            const isExpired = helper.isTokenExpired(currentUser.data.token);

            if (isExpired) {
                this.authenticationService.logout();
                location.reload();
            }

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.data.token}`
                }
            });
        }
        return next.handle(request);
    }
}
