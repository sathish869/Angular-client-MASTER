import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export function errorHandler(errorData: HttpErrorResponse) {
  let error = 'Some error was there';
  if (errorData.error && errorData.error.message) {
    return throwError(()=>errorData.error.message);
  } else if (errorData.message) {
    return throwError(() => errorData.message);
  }
  return throwError(() => error);
}
