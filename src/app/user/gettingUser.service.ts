import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { RepoDetail } from '../model/repoDetail.model';
import { UserDetails, UsersDetails } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class gettingUserService {
  constructor(private http: HttpClient) {}

  onLoadUsers(): Observable<UsersDetails[]> {
    return this.http.get<UsersDetails[]>('https://api.github.com/users');
  }

  onLoadUserDetail(userName: string): Observable<[UserDetails, RepoDetail[]]> {
    let userDetail$ = this.http.get<UserDetails>(
      'https://api.github.com/users/' + userName
    );
    let UserRepoDetail$ = this.http.get<RepoDetail[]>(
      'https://api.github.com/users/' + userName + '/repos'
    );
    return combineLatest([userDetail$, UserRepoDetail$]);
  }
}
