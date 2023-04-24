import { createSelector } from '@ngrx/store';
import * as appStore from '../../../app/app-store/app-store.module';

const UserDetailStateSelector = createSelector(
  appStore.selectState,
  (state) => state.userDetailState
);

export const treeDataSelector = createSelector(
  UserDetailStateSelector,
  (state) => state.userNodeData
);
