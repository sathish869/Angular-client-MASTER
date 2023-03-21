import { Action, createReducer, on } from '@ngrx/store';
import { UserDetails } from '../../models/user.model';
import { authActions } from './auth.actions';

export interface authState {
  userData: UserDetails | null;
  userToken: string | null;
  loginError: string | null;
}

export const initialState: authState = {
  userData: null,
  userToken: null,
  loginError: null,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.logout, (state) => ({
    ...state,
    userData: null,
    userToken: null,
    loginError: null,
  })),
  on(authActions.loginFailed, (state, { loginError }) => ({
    ...state,
    userData: null,
    userToken: null,
    loginError: loginError,
  })),
  on(authActions.getUserToken, (state, { userToken }) => ({
    ...state,
    userData: null,
    userToken: userToken,
    loginError: null,
  })),
  on(authActions.retrieveCurrentUser, (state, { currentUser }) => ({
    ...state,
    userData: currentUser,
    userToken: null,
    loginError: null,
  }))
);

export function authReducers(state: authState | undefined, action: Action) {
  return authReducer(state, action);
}
