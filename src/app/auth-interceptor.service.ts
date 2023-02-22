import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { universalStoreOfState } from './appStore/app-store.module';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  token: string = '';
  constructor(private store: Store<universalStoreOfState>) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.token !== '') {
      const modifedReq = req.clone({
        headers: req.headers.append('Authorization', ' Bearer ' + this.token),
      });
      return next.handle(modifedReq);
    }
    return next.handle(req);
  }
}
