import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params,
  Route,
  Router,
} from '@angular/router';
import { userDetails } from 'src/app/user.model';
import { gettingUserService } from '../gettingUser.service';

@Injectable({ providedIn: 'root' })
export class userDetailResolverService {
  constructor(
    private gettingUserService: gettingUserService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let username: string = route.params['username'];
    this.http
      .get<userDetails>('https://api.github.com/users/' + username)
      .subscribe(
        (responseData) => {
          this.gettingUserService.userClicked.next(responseData);
        },
        (error) => {
          this.matSnackBar.open(
            'The user ' + username + ' ' + error.error.message
          );
          this.router.navigate(['/users'], { relativeTo: this.route });
          console.log(error.error.message);
        }
      );
  }
}
