import { createAction, props } from '@ngrx/store';
import { userDetails } from 'src/app/user.model';


const getUserToken = createAction("[LOGIN-PAGE] Get User Token", props<{userToken:string}>());
const loginFailed = createAction("[LOGIN-PAGE] login Failed", props<{ loginError: any }>());
const retriveCurrentUser=createAction("[LOGIN-PAGE] retrive Logged User", props<{ currentUser: userDetails}>());
const logout=createAction("[LOGIN-PAGE] logout user");

export const authActions={
  getUserToken,
  loginFailed,
  retriveCurrentUser,
  logout
}




