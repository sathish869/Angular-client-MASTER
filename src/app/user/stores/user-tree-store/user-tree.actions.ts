import { createAction, props } from '@ngrx/store';
import { UsersDetails } from '../../models/user.model';

const retrievedUsers = createAction("[USER] retrieve users", props<{ userList: UsersDetails[] }>());
const RetrieveUsersFailed = createAction("[USER] error in retrieve users", props<{ error: string }>());
const RemoveLoadedUser=createAction("[USER] remove loaded users")
const retrieveUsersData = createAction("[USER] retrieve all users");

export const userListAction =
  {
    retrievedUsers,
    RetrieveUsersFailed,
    retrieveUsersData,
    RemoveLoadedUser
  }