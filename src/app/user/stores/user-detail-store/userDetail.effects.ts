import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { handleAnError } from '../../utils/http-error-handler.utils';
import { userDetailActions } from './userDetail.actions';
import { TokenShareService } from '../../services/token-share.service';
import { UserDetails } from '../../models/user.model';
import { RepositoryDetail } from '../../models/repo-detail.model';

@Injectable()
export class UserDetailEffects {
  retrieveClickedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userDetailActions.passUserName),
      mergeMap((responseData) => {
        return this.tokenShareService
          .onLoadUserDetail(responseData.userName)
          .pipe(
            map((userData: [UserDetails, RepositoryDetail[]]) =>
              userDetailActions.retrieveClickedUser({ userData: userData })
            ),
            catchError((errorData: HttpErrorResponse) =>
              of(
                userDetailActions.loadingUserDetailFailed({
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
    private tokenShareService: TokenShareService
  ) {}
}
