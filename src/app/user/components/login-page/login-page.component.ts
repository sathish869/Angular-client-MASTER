import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tokenShareService } from '../../services/token-share.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginDetailService } from '../../services/login-detail.service';
import { UserDetails } from '../../models/user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tokenShareService: tokenShareService,
    private matSnackBar: MatSnackBar,
    private loginDetailService: LoginDetailService
  ) {}
  ngOnInit(): void {
    this.loginDetailService.isLoggedIn.next(false);
  }
  onLogin(token: string): void {
    this.tokenShareService.onValidateToken(token).subscribe({
      next: (userData: UserDetails) => {
        this.loginDetailService.isLoggedIn.next(true);
        console.log(userData);
        this.loginDetailService.currentUser.next(userData);
        this.tokenShareService.onEmitToken(token);
        this.router.navigate(['/users'], { relativeTo: this.route });
      },
      error: (error: string) => {
        this.matSnackBar.open(error);
      },
    });
  }
  onGetIn(): void {
    this.tokenShareService.onEmitToken('');
    this.router.navigate(['/users'], { relativeTo: this.route });
  }
}
