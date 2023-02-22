import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {  Observable, tap } from 'rxjs';
import { universalStoreOfState } from '../appStore/app-store.module';
import { userDetails, usersDetails } from '../user.model';

@Injectable({ providedIn: 'root' })
export class gettingUserService {

  constructor(private http: HttpClient){}

  onLoadUsers():Observable<usersDetails[]> {
    return this.http.get<usersDetails[]>('https://api.github.com/users')
  }
  
  onLoadUserDetail(userName:string):Observable<userDetails>{
     return this.http.get<userDetails>('https://api.github.com/users/'+userName)
  }
}
