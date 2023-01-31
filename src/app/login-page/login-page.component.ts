import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tokenShareService } from '../token-share.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loginDetailService } from './login-detail.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
 

  loginError: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tokenShareService: tokenShareService,
    private matSnackBar: MatSnackBar,
    private logindetailService:loginDetailService
  ) {}
  ngOnInit(): void {
    this.logindetailService.isLoggedin.next(false);
    this.logindetailService.isinLoginPage.next(true);
  }
  onLogin(token: string) {
    this.matSnackBar.dismiss();
    this.logindetailService.isLoggedin.next(true);
    this.tokenShareService.onValidateToken(token).subscribe(
      (userData) => {
        console.log(userData);
        this.logindetailService.currentUser.next(userData)
        this.tokenShareService.onSetToken(token);
        this.router.navigate(['/users'], { relativeTo: this.route });
        this.logindetailService.isinLoginPage.next(false);
      },
      (error) => {
        this.loginError = error;
        this.matSnackBar.open(error);
      }
    );
  }
  onGetIn() {
    this.matSnackBar.dismiss();
    this.logindetailService.isLoggedin.next(false);
    this.logindetailService.isinLoginPage.next(false);
    this.router.navigate(['/users'], { relativeTo: this.route });
  }
}
