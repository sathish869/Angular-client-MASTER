import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { errorMessageHandling } from 'src/app/errorHandlingService';
import { usersDetails } from 'src/app/user.model';
import { gettingUserService } from '../gettingUser.service';
import { userListAction } from './userList.actions';

@Injectable()
export class UserEffects {
  retrieveUsersList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userListAction.retrieveUsersData),
      mergeMap(() => {
        return this.gettingUserService.onLoadUsers().pipe(
          map((userList: usersDetails[]) =>
            userListAction.retrievedUsers({ userList: userList })
          ),
          catchError((errorData: HttpErrorResponse) =>
            of(
              userListAction.RetrieveUsersFailed({
                error: errorMessageHandling(errorData),
              })
            )
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private gettingUserService: gettingUserService
  ) {}
}
