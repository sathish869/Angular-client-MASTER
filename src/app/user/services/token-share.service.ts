import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, Observable } from 'rxjs';
import { errorHandler } from '../utils/http-error-handler.utils';
import { UserDetails, UsersDetails } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class tokenShareService {
  constructor(private http: HttpClient) {}
  public tokenEmitter = new Subject<string>();
  public currentUser = new Subject<string>();

  onValidateToken(token: string): Observable<UserDetails> {
    return this.http
      .get<UserDetails>('https://api.github.com/user', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .pipe(catchError(errorHandler));
  }

  onEmitToken(token: string): void {
    this.tokenEmitter.next(token);
  }

  onLoadUsers(): Observable<UsersDetails[]> {
    return this.http
      .get<UsersDetails[]>('https://api.github.com/users')
      .pipe(catchError(errorHandler));
  }
}
