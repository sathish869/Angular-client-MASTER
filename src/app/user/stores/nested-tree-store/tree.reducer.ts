import { Action, createReducer, on } from '@ngrx/store';
import {  UserNode } from '../../models/node-details.models';
import { treeActions } from './tree.actions';

export interface treeState {
  treeData: UserNode[] | [];
  error: string | null;
}
export const initialState: treeState = {
  treeData: [],
  error: null,
};

export const TreeReducer = createReducer(
  initialState,
  on(treeActions.storeTreeData, (state, { userNodeData }) => ({
    treeData: userNodeData,
    error: null,
  })),
  on(treeActions.removeTreeData,(state)=>({
    treeData: [],
    error: null,
  }))
);

export function TreeReducers(state: treeState | undefined, action: Action) {
  return TreeReducer(state, action);
}
