import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, Observable } from 'rxjs';
import { errorHandler } from '../utils/http-error-handler.utils';
import { UserDetails, UsersDetails } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class TokenShareService {
  tokenEmitter = new Subject<string>();
  constructor(private http: HttpClient) {}

  validateToken(token: string): Observable<UserDetails> {
    return this.http
      .get<UserDetails>('https://api.github.com/user', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .pipe(catchError(errorHandler));
  }

  emitToken(token: string): void {
    this.tokenEmitter.next(token);
  }

  loadUsers(): Observable<UsersDetails[]> {
    return this.http
      .get<UsersDetails[]>('https://api.github.com/users')
      .pipe(catchError(errorHandler));
  }
}
