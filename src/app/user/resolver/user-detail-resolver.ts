import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { universalStoreOfState } from 'src/app/app/app-store/app-store.module';
import { userDetailActions } from '../stores/user-detail-store/userDetail.actions';

@Injectable({ providedIn: 'root' })
export class userDetailResolver {
  constructor(private store: Store<universalStoreOfState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let username: string = route.params['username'];
    this.store.dispatch(userDetailActions.passUserName({ userName: username }));
  }
}
