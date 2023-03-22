import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Subject, Observable } from 'rxjs';
=======
import { Subject, catchError, Observable } from 'rxjs';
import { errorHandler } from '../utils/http-error-handler.utils';
>>>>>>> 3800e28f010a648eb81d94993486d85aad86e777
import { UserDetails, UsersDetails } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class tokenShareService {
  constructor(private http: HttpClient) {}
  public tokenEmitter = new Subject<string>();
  public currentUser = new Subject<string>();

  onValidateToken(token: string): Observable<UserDetails> {
    return this.http.get<UserDetails>('https://api.github.com/user', {
      headers: { Authorization: 'Bearer ' + token },
    });
  }

  onLoadUsers(): Observable<UsersDetails[]> {
    return this.http.get<UsersDetails[]>('https://api.github.com/users');
  }

  onLoadUserDetail(userName: string): Observable<UserDetails> {
    return this.http.get<UserDetails>('https://api.github.com/users/' + userName);
  }
}
