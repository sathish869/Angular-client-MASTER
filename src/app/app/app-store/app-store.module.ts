import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from '../../user/stores/auth-store/auth.effects';
import {
  authState,
  authReducers,
} from '../../user/stores/auth-store/auth.reducer';
import {
  userListReducers,
  userListState,
} from '../../user/stores/user-tree-store/user-tree.reducer';
import {
  UserDetailReducers,
  userDetailState,
} from '../../user/stores/user-detail-store/userDetail.reducer';
import { UserEffects } from '../../user/stores/user-tree-store/user-tree.effects';
import { UserDetailEffects } from '../../user/stores/user-detail-store/userDetail.effects';
import { TreeReducers, treeState } from 'src/app/user/stores/nested-tree-store/tree.reducer';

export type universalStoreOfState = {
  authState: authState;
  usersState: userListState;
  userDetailState: userDetailState;
  treeState: treeState;
};

const allReducers: ActionReducerMap<universalStoreOfState> = {
  authState: authReducers,
  usersState: userListReducers,
  userDetailState: UserDetailReducers,
  treeState: TreeReducers,
};

export const allEffects = [AuthEffects, UserEffects, UserDetailEffects];

export const storeOfAppModule = {
  allReducers,
  allEffects,
};
