import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ErrorDataService } from './../services/ErrorData.service';
import { Injectable } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RequestResponseInterceptor implements HttpInterceptor {
    errorDetails: any;
    currentUrl:any;
    constructor(private router: Router, private _errorDataService: ErrorDataService) {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd ) {
              this.currentUrl = event.url;
            }
          });
     }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(localStorage.getItem('currentUser') && (this.currentUrl !== "/searchImages")){
            req = req.clone({
                setHeaders: {
                  Authorization: "Bearer " + currentUser.token
                }
              });
    
        }
       
        return next.handle(req)
            .do(
            (response: any) => {
                if (response instanceof HttpResponse) {
                    // console.log(response);
                }

                return response;
            },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    this.errorDetails = err;
                    this._errorDataService.emitErrorData(this.errorDetails);
                    this.router.navigate(['/error']);
                }
            });
    }
}