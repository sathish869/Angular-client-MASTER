import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { gettingUserService } from './user/gettingUser.service';

export function errorMessageHandling(
  errorObject: HttpErrorResponse
): string | null {
  if (errorObject.error && errorObject.error.message) {
    return errorObject.error.message;
  } else {
    return 'Something unknown error came ';
  }
}

export function errorHandler(errorData: HttpErrorResponse) {
  var error = 'Some error was there';
  if (errorData.error && errorData.error.message) {
    return throwError(errorData.error.message);
  } else if (errorData.message) {
    return throwError(() => errorData.message);
  }
  return throwError(() => error);
}


