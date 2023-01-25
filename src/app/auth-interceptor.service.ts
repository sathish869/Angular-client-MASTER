import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tokenShareService } from './token-share.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  token: string = '';
  constructor(private tokenSharingService: tokenShareService) {
    this.tokenSharingService.tokenEmitter.subscribe((token) => {
      this.token = token;
    });
  }
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
