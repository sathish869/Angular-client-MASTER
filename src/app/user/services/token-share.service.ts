import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Subject, Observable, combineLatest, tap } from 'rxjs';
import { UserNode } from '../models/node-details.models';
import { RepositoryDetail } from '../models/repo-detail.model';
import { UserDetails, UsersDetails } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class TokenShareService {
  constructor(private http: HttpClient) {}
  tokenEmitter = new Subject<string>();
  currentUser = new Subject<string>();

  onValidateToken(token: string): Observable<UserDetails> {
    return this.http.get<UserDetails>('https://api.github.com/user', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        skip: 'true',
      }),
    });
  }

  onLoadUsers(): Observable<UsersDetails[]> {
    return this.http.get<UsersDetails[]>('https://api.github.com/users');
  }

  onLoadUserDetail(
    userName: string
  ): Observable<[UserDetails, RepositoryDetail[]]> {
    let userDetail$ = this.http.get<UserDetails>(
      'https://api.github.com/users/' + userName
    );
    let UserRepoDetail$ = this.http.get<RepositoryDetail[]>(
      'https://api.github.com/users/' + userName + '/repos'
    );
    return combineLatest([userDetail$, UserRepoDetail$]);
  }

  onGetRepoDetail(userName: string): Observable<UserNode[]> {
    return this.http
      .get<RepositoryDetail[]>(
        'https://api.github.com/users/' + userName + '/repos'
      )
      .pipe(
        map((ReposDetail: RepositoryDetail[]) =>
          ReposDetail.map((repoDetail) =>
            this.onCreateCustomizedRepo(repoDetail)
          )
        )
      );
  }

  onCreateCustomizedRepo(repoDetail: RepositoryDetail): UserNode {
    return {
      name: repoDetail.name,
      stargazers_count: repoDetail.stargazers_count,
      level: 1,
      children: [],
    };
  }
}
