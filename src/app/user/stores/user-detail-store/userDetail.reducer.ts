import { Action, createReducer, on } from '@ngrx/store';
import { RepositoryDetail } from '../../models/repo-detail.model';
import { UserDetails } from '../../models/user.model';
import { userDetailActions } from './userDetail.actions';
import { UserNode } from '../../models/node-details.models';
import { state } from '@angular/animations';

export interface userDetailState {
  clickedUser: [UserDetails,RepositoryDetail[]] | null;
  userNodeData:UserNode[]| [];
  loadingFlag: boolean;
  error: string | null;
}

export const initialState: userDetailState = {
  clickedUser: null,
  userNodeData:[],
  loadingFlag: false,
  error: null,
};

export const UserDetailReducer = createReducer(
  initialState,
  on(userDetailActions.deleteClickedUser, (state) => ({
    ...state,
    clickedUser: null,
    loadingFlag: false,
    error: null,
  })),
  on(userDetailActions.loadingUserDetailFailed, (state, { error }) => ({
    ...state,
    clickedUser: null,
    loadingFlag: false,
    error: error,
  })),
  on(userDetailActions.retrieveClickedUser, (state, { userData }) => ({
    ...state,
    clickedUser: userData,
    loadingFlag: null,
    error: null,
  })),
  on(userDetailActions.passUserName, (state) => ({
    ...state,
    clickedUser: null,
    loadingFlag: true,
    error: null,
  })),
  on(userDetailActions.loadUserNodeData,(state ,{userTreeData})=>({
    clickedUser: null,
    userNodeData:userTreeData,
    loadingFlag: false,
    error: null,
  })),
  on(userDetailActions.removeTreeData,(state )=>({
    clickedUser: null,
    userNodeData:[],
    loadingFlag: false,
    error: null,
  }))
);
export function UserDetailReducers(
  state: userDetailState | undefined,
  action: Action
) {
  return UserDetailReducer(state, action);
}
