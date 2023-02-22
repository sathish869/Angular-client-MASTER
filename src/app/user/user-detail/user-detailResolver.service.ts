import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { universalStoreOfState } from 'src/app/appStore/app-store.module';
import { userDetailActions } from './userDetail_store/userDetail.actions';

@Injectable({ providedIn: 'root' })
export class userDetailResolverService {
  constructor(private store: Store<universalStoreOfState>) {
    
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let username: string = route.params['username'];
    this.store.dispatch(userDetailActions.passUserName({ userName: username }));
  }
}
