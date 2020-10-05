import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { observable, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor( private ApiService: ApiService, private router:Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('acessToken');

    if(token){
      request = request.clone({headers: request.headers.set('Authorization', 'Bearer' + token)});
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse){
          console.log('Event ', event);          
        }
        return event;
      }),
      catchError(error => {
        if(error instanceof HttpErrorResponse){
          switch (error.status) {
            case 409:
                console.log('Error 409');
                return this.handleErrorGeneral(error);
            case 404:
              console.log('Error 404');
              return this.handleErrorGeneral(error);
            case 403:
              console.log('Error 403');
              return this.getAcessToken(request, next);;
            case 0:
              console.log('Error 0');
              return this.getAcessToken(request, next);
            case 401:
              console.log('Error 401');
              return  this.router.navigate(['login']);
            case 400:
              console.log('Error 400');
              return  this.router.navigate(['login']);
            case 303:
              console.log('Error 303');
              return this.handle303Error(error);
          }
        }
        Observable.throw(error);
      })
    );
  }

  private getAcessToken( req: HttpRequest<any>, next: HttpHandler) : Observable<any> {
    return this.ApiService.getAcessToken(localStorage.getItem('refreshToken'))
      .switchMap(resp =>{
        localStorage.setItem('acessToken', resp.acess_token);
        const token = localStorage.getItem('acessToken');
        req = req.clone({headers: req.headers.set('Authorization', 'Bearer' + token)});
        return next.handle(req);
      });
  }

  handleErrorGeneral(error){

    if (error.status === 409 || error.status === 404 ){
      console.log(error.status);
      return EmptyObservable.create();      
    }
    return EmptyObservable.create();

  }

  handle303Error(error){
    if(error.error.message === 'invalidToken') {
      return this.router.navigate(['resend-register-token']);
    } else if(error.error.message === 'expired') {
      return this.router.navigate(['resend-register-token']);
    }

    return EmptyObservable.create();
  }

}
