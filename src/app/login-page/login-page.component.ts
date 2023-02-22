import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { universalStoreOfState } from '../appStore/app-store.module';
import { Store } from '@ngrx/store';
import { authActions } from './auth_store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginStateSub = new Subscription();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private store: Store<universalStoreOfState>
  ) {}
  ngOnInit(): void {
    this.loginStateSub = this.store
      .select('authState')
      .subscribe((authState) => {
        if (authState.loginError) {
          this.matSnackBar.open(authState.loginError);
        }
        if (authState.userData) {
          this.router.navigate(['/users'], { relativeTo: this.route });
        }
      });
  }
  onLogin(token: string) {
    this.matSnackBar.dismiss();
    this.store.dispatch(authActions.getUserToken({ userToken: token }));
  }
  onGetIn() {
    this.matSnackBar.dismiss();
    this.router.navigate(['/users'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.loginStateSub.unsubscribe();
  }
}
