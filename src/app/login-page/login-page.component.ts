import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tokenShareService } from '../token-share.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginError: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tokenShareService: tokenShareService,
    private matSnackBar: MatSnackBar
  ) {}
  onLogin(token: string) {
    this.matSnackBar.dismiss();
    this.tokenShareService.onValidateToken(token).subscribe(
      (userData) => {
        console.log(userData);
        this.tokenShareService.onSetToken(token);
        this.router.navigate(['/users'], { relativeTo: this.route });
      },
      error => {
        this.loginError = error;
        this.matSnackBar.open(error);
      }
    );
  }
  onGetIn() {
    this.matSnackBar.dismiss();
    this.router.navigate(['/users'], { relativeTo: this.route });
  }
}
