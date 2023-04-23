import { Action, createReducer, on } from '@ngrx/store';
import { UsersDetails } from '../../models/user.model';
import { userListAction } from './user-tree.actions';

export interface userListState {
  usersData: UsersDetails[] | null;
  error: string | null;
  loadingFlag: boolean;
}

export const initialState: userListState = {
  usersData: null,
  error: null,
  loadingFlag: false,
};

export const userListReducer = createReducer(
  initialState,
  on(userListAction.retrieveUsersData, (state) => ({
    usersData: null,
    error: null,
    loadingFlag: true,
  })),
  on(userListAction.retrievedUsers, (state, { userList }) => ({
    usersData: userList,
    error: null,
    loadingFlag: false,
  })),
  on(userListAction.RemoveLoadedUser, (state) => ({
    usersData: null,
    error: null,
    loadingFlag: false,
  })),
  on(userListAction.RetrieveUsersFailed, (state, { error }) => ({
    usersData: null,
    error: error,
    loadingFlag: false,
  }))
);

export function userListReducers(state: userListState, action: Action) {
  return userListReducer(state, action);
}
