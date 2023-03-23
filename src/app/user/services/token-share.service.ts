import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { RepositoryDetail } from '../models/repo-detail.model';
import { UserDetails, UsersDetails } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class tokenShareService {
  constructor(private http: HttpClient) {}
  public tokenEmitter = new Subject<string>();
  public currentUser = new Subject<string>();

  onValidateToken(token: string): Observable<UserDetails> {
    return this.http.get<UserDetails>('https://api.github.com/user',
     {
      headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'skip':"true"
      })
     
    });
  }

  onLoadUsers(): Observable<UsersDetails[]> {
    return this.http.get<UsersDetails[]>('https://api.github.com/users');
  }

  onLoadUserDetail(userName: string): Observable<[UserDetails, RepositoryDetail[]]> {
    let userDetail$ = this.http.get<UserDetails>(
      'https://api.github.com/users/' + userName
    );
    let UserRepoDetail$ = this.http.get<RepositoryDetail[]>(
      'https://api.github.com/users/' + userName + '/repos'
    );
    return combineLatest([userDetail$, UserRepoDetail$]);
  }
}
