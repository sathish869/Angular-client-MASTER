import { createAction, props } from '@ngrx/store';
import { RepositoryDetail } from '../../models/repo-detail.model';
import { UserDetails } from '../../models/user.model';


const loadingUserDetailFailed=createAction("[USER_DETAIL] load clicked user", props<{ error: string }>());
const deleteClickedUser=createAction("[USER_DETAIL] delete clicked user");
const retrieveClickedUser=createAction("[USER_DETAIL] retrieve clicked user", props<{ userData:[UserDetails,RepositoryDetail[]] }>());
const passUserName=createAction("[USER_DETAIL] pass userName", props<{ userName:string }>())

export const userDetailActions = {
  loadingUserDetailFailed,
  deleteClickedUser,
  retrieveClickedUser,
  passUserName
}