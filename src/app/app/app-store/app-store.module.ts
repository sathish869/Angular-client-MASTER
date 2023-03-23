import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from '../../user/stores/auth-store/auth.effects';
import {
  authState,
  authReducers,
} from '../../user/stores/auth-store/auth.reducer';
import {
  userListReducers,
  userListState,
} from '../../user/stores/user-list-store/userList.reducer';
import {
  UserDetailReducers,
  userDetailState,
} from '../../user/stores/user-detail-store/userDetail.reducer';
import { UserEffects } from '../../user/stores/user-list-store/userList.effects';
import { UserDetailEffects } from '../../user/stores/user-detail-store/userDetail.effects';

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

export const allEffects = [AuthEffects, UserEffects, UserDetailEffects];

export const storeOfAppModule = {
  allReducers,
  allEffects,
};
