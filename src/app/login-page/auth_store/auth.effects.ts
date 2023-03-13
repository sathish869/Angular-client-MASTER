import {
  HttpBackend,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { errorMessageHandling } from 'src/app/errorHandlingService';
import { tokenShareService } from 'src/app/token-share.service';
import { UserDetails } from 'src/app/model/user.model';
import { authActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private handler: HttpBackend,
    private tokenShareService: tokenShareService
  ) {
    this.http = new HttpClient(handler);
  }

  currentUserLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getUserToken),
      mergeMap((loginData) => {
        return this.tokenShareService.onValidateToken(loginData.userToken).pipe(
          map(
            (userData: UserDetails) =>
              authActions.retriveCurrentUser({ currentUser: userData }),
          ),
          catchError((errorData: HttpErrorResponse) =>
            of(
              authActions.loginFailed({
                loginError: errorMessageHandling(errorData),
              })
            )            
          )
        );
      })
    )
  );
}
