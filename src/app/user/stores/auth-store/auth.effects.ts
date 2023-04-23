import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, Observable } from 'rxjs';
import { handleAnError } from '../../utils/http-error-handler.utils';
import { TokenShareService } from '../../services/token-share.service';
import { authActions } from './auth.actions';
import { UserDetails } from '../../models/user.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private tokenShareService: TokenShareService
  ) {}

  currentUserLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getUserToken),
      mergeMap((loginData) => {
        return this.tokenShareService.onValidateToken(loginData.userToken).pipe(
          map((userData: UserDetails) => {
            userData.token = loginData.userToken;
            return authActions.retrieveCurrentUser({ currentUser: userData });
          }),
          catchError((errorData: HttpErrorResponse) =>
            of(
              authActions.loginFailed({
                loginError: handleAnError(errorData),
              })
            )
          )
        );
      })
    )
  );
}
