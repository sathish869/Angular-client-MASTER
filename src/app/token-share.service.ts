import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, pipe } from 'rxjs';
import { errorHandler } from './errorHandlingService';

@Injectable({ providedIn: 'root' })
export class tokenShareService {
  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }
  public GitHubToken: string = '';
  public tokenEmitter = new Subject<string>();
  public currentUser = new Subject<string>();

  onValidateToken(token: string) {
    return this.http
      .get('https://api.github.com/user', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .pipe(catchError(errorHandler));
  }

  onSetToken(token: string) {
    this.GitHubToken = token;
    this.tokenEmitter.next(this.GitHubToken);
  }
}
