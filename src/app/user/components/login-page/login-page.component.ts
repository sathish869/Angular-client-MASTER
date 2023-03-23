import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { universalStoreOfState } from 'src/app/app/app-store/app-store.module';
import { Subscription } from 'rxjs';
import { authActions } from '../../stores/auth-store/auth.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginStateSub = new Subscription();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<universalStoreOfState>,
    private matSnackBar: MatSnackBar
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
  onLogin(token: string): void {
    this.matSnackBar.dismiss();
    this.store.dispatch(authActions.getUserToken({ userToken: token }));
  }

  ngOnDestroy() {
    this.loginStateSub.unsubscribe();
  }
}
