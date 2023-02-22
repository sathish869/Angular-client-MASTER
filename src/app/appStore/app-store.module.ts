import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from '../login-page/auth_store/auth.effects';
import { authState, authReducers } from '../login-page/auth_store/auth.reducer';
import {
  userListReducers,
  userListState,
} from '../user/userList_store/userList.reducer';
import {
  UserDetailReducers,
  userDetailState,
} from '../user/user-detail/userDetail_store/userDetail.reducer';
import { UserEffects } from '../user/userList_store/userList.effects';
import { UserDetailEffects } from '../user/user-detail/userDetail_store/userDetail.effects';

export type universalStoreOfState = {
  authState: authState;
  usersState: userListState;
  userDetailState: userDetailState;
};

const allReducers: ActionReducerMap<universalStoreOfState> = {
  authState: authReducers,
  usersState: userListReducers,
  userDetailState: UserDetailReducers,
};

export const allEffects = [AuthEffects,UserEffects,UserDetailEffects];

export const storeOfAppModule = {
  allReducers,
  allEffects,
};
