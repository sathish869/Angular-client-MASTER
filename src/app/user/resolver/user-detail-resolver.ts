import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { LoginDetailService } from '../services/login-detail.service';
import { errorHandler } from '../utils/http-error-handler.utils';
import { UserDetails } from '../models/user.model';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class userDetailResolver {
  constructor(
    private loginDetailService: LoginDetailService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let username: string = route.params['username'];
    this.http
      .get<UserDetails>('https://api.github.com/users/' + username)
      .pipe(catchError(errorHandler))
      .subscribe({
        next: (responseData: UserDetails) => {
          this.loginDetailService.clickedUser.next(responseData);
          this.loginDetailService.userDetailLoading.next(false);
        },
        error: (error: string) => {
          this.matSnackBar.open(error);
          this.loginDetailService.userDetailLoading.next(false);
          this.router.navigate(['/users'], { relativeTo: this.route });
        },
      });
  }
}
