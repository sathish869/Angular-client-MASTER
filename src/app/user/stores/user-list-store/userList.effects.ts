import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { handleAnError } from '../../utils/http-error-handler.utils';
import { UsersDetails } from '../../models/user.model';
import { tokenShareService } from '../../services/token-share.service';
import { userListAction } from './userList.actions';

@Injectable()
export class UserEffects {
  retrieveUsersList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userListAction.retrieveUsersData),
      mergeMap(() => {
        return this.tokenShareService.onLoadUsers().pipe(
          map((userList: UsersDetails[]) =>
            userListAction.retrievedUsers({ userList: userList })
          ),
          catchError((errorData: HttpErrorResponse) =>
            of(
              userListAction.RetrieveUsersFailed({
                error: handleAnError(errorData),
              })
            )
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private tokenShareService: tokenShareService
  ) {}
}
