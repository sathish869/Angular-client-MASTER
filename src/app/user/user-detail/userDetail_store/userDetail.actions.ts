import { createAction, props } from '@ngrx/store';
import { userDetails } from 'src/app/user.model';

const loadingUserDetailFailed=createAction("[USER_DETAIL] load clicked user", props<{ error: string }>());
const deleteClickedUser=createAction("[USER_DETAIL] delete clicked user");
const retrieveClickedUser=createAction("[USER_DETAIL] retrieve clicked user", props<{ userData:userDetails }>());
const passUserName=createAction("[USER_DETAIL] pass userName", props<{ userName:string }>())

export const userDetailActions = {
  loadingUserDetailFailed,
  deleteClickedUser,
  retrieveClickedUser,
  passUserName
}