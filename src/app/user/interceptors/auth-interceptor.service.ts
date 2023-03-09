import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tokenShareService } from '../services/token-share.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  token: string = '';
  constructor(private tokenSharingService: tokenShareService) {
    this.tokenSharingService.tokenEmitter.subscribe((token:string) => {
      this.token = token;
    });
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.token !== '') {
      const modifiedReq = req.clone({
        headers: req.headers.append('Authorization', ' Bearer ' + this.token),
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}
