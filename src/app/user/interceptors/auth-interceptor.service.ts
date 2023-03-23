import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { universalStoreOfState } from 'src/app/app/app-store/app-store.module';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  token: string = '';
  constructor(private store: Store<universalStoreOfState>) {
    const storeSub = this.store.select('authState').subscribe((user) => {
      this.token = user.userToken;
    });
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const skipIntercept = req.headers.has('skip');

    if (!skipIntercept) {
      if (this.token) {
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${this.token}` },
        });
        return next.handle(req);
      } else {
        return next.handle(req);
      }
    } else {
      req = req.clone({
        headers: req.headers
          .delete('skip')
          .set('Accept', 'application/vnd.github+json'),
      });
    }
    return next.handle(req);
  }
}
