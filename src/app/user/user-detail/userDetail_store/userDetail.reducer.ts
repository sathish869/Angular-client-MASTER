import { Action, createReducer, on } from '@ngrx/store';
import { userDetails } from 'src/app/user.model';
import { userDetailActions } from './userDetail.actions';

export interface userDetailState {
  clickedUser: userDetails | null;
  loadingFlag: boolean;
  error: string | null;
}

export const initialState: userDetailState = {
  clickedUser: null,
  loadingFlag: false,
  error: null,
};

export const UserDetailReducer = createReducer(
  initialState,
  on(userDetailActions.deleteClickedUser, (state) => ({
    clickedUser: null,
    loadingFlag: false,
    error: null,
  })),
  on(userDetailActions.loadingUserDetailFailed, (state, { error }) => ({
    clickedUser: null,
    loadingFlag: false,
    error: error,
  })),
  on(userDetailActions.retrieveClickedUser, (state, { userData }) => ({
    clickedUser: userData,
    loadingFlag: null,
    error: null,
  })),
  on(userDetailActions.passUserName, (state, { userName }) => ({
    clickedUser: null,
    loadingFlag: true,
    error: null,
  }))
);
export function UserDetailReducers(
  state: userDetailState | undefined,
  action: Action
) {
  return UserDetailReducer(state, action);
}
