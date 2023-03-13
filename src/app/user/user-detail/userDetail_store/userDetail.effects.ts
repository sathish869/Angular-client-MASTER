import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, pipe } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { errorMessageHandling } from 'src/app/errorHandlingService';
import { RepoDetail } from 'src/app/model/repoDetail.model';
import { UserDetails } from 'src/app/model/user.model';
import { gettingUserService } from '../../gettingUser.service';
import { userDetailActions } from './userDetail.actions';

@Injectable()
export class UserDetailEffects {
  retrieveClickedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userDetailActions.passUserName),
      mergeMap((responseData) => {
        return this.gettingUserService
          .onLoadUserDetail(responseData.userName)
          .pipe(
            map((userData: [UserDetails, RepoDetail[]]) =>
              userDetailActions.retrieveClickedUser({ userData: userData })
            ),
            catchError((errorData: HttpErrorResponse) =>
              of(
                userDetailActions.loadingUserDetailFailed({
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
