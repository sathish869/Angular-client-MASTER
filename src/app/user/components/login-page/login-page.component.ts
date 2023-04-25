import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenShareService } from '../../services/token-share.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginDetailService } from '../../services/login-detail.service';
import { UserDetails } from '../../models/user.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private router: Router,
    private tokenShareService: TokenShareService,
    private matSnackBar: MatSnackBar,
    private loginDetailService: LoginDetailService
  ) {}
  ngOnInit(): void {
    this.loginDetailService.isLoggedIn.next(false);
  }
  onLogin(token: string): void {
    this.tokenShareService.validateToken(token).pipe(
      take(1)
    ).subscribe({
      next:(userData: UserDetails) => {
        this.loginDetailService.isLoggedIn.next(true);
        console.log(userData);
        this.loginDetailService.currentUser.next(userData);
        this.tokenShareService.emitToken(token);
        this.router.navigate(['/users']);
      },
      error: (error:string) => {
        this.matSnackBar.open(error);
      }});
  }
  onGetIn(): void {
    this.tokenShareService.emitToken('');
    this.router.navigate(['/users']);
  }
}
