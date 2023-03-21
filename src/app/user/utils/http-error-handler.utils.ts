import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export function errorHandler(errorData: HttpErrorResponse) {
  var error = 'Unknown error is there';
  if (errorData.error && errorData.error.message) {
    return throwError(()=>errorData.error.message);
  } else if (errorData.message) {
    return throwError(() => errorData.message);
  }
  return throwError(() => error);
}

export function handleAnError(errorData: HttpErrorResponse){
  let errorMsg = 'Unknown error is there';
  if (errorData.error && errorData.error.message) {
    return errorData.error.message;
  } else {
    return errorMsg;
  }
}