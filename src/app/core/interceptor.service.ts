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

  constructor(  private ApiService: ApiService, 
                private router:Router,
                private messageService: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('accessToken');

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
                this.messageService.showWarning('Falha de registro', 'O e-mail utilizado no cadastro está sendo usado por outro usuário');
                return this.handleErrorGeneral(error);
            case 404:
              this.messageService.showError('Usuário não encontrado', 'Favor verificar se seu e-mail foi digitado corretamente');
              return this.handleErrorGeneral(error);
            case 403:
              console.log('Error 403');
              return this.getAccessToken(request, next);
            case 0:
              console.log('Error 0');
              localStorage.removeItem('accessToken');
              return this.getAccessToken(request, next);
            case 401:
              this.messageService.showError('', error.error.message);
              return  this.router.navigate(['login']);
            case 400:
              this.messageService.showError('Falha de autenticação', 'Usuário ou senha inválidos');
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

  private getAccessToken( req: HttpRequest<any>, next: HttpHandler) : Observable<any> {
    return this.ApiService.getAccessToken(localStorage.getItem('refreshToken'))
      .switchMap(resp =>{
        localStorage.setItem('accessToken', resp.acess_token);
        const token = localStorage.getItem('accessToken');
        req = req.clone({headers: req.headers.set('Authorization', 'Bearer' + token)});
        return next.handle(req);
      });
  }

  handleErrorGeneral(error){

    if (error.status === 409 || error.status === 404 ){
      return this.ApiService.logout();    
    }
    return EmptyObservable.create();

  }

  handle303Error(error){
    if(error.error.message === 'invalidToken') {
      this.messageService.showError('Verificação de registro', 'Token inválido, favor solicitar um novo token');
      return this.router.navigate(['resend-register-token']);
    } else if(error.error.message === 'expired') {
      this.messageService.showError('Verificação de registro', 'Token expirou, favor solicitar um novo token');
      return this.router.navigate(['resend-register-token']);
    }

    return EmptyObservable.create();
  }

}
