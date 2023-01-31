import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { loginDetailService } from '../login-detail.service';
import { LoginPageComponent } from '../login-page.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedinSubscription = new Subscription();
  isInLoginPageSub = new Subscription();

  isInLoginPage: boolean; 
  isLoggedIn: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private logindetailService:loginDetailService
  ) {}

  ngOnInit(): void {
    this.loggedinSubscription = this.logindetailService.isLoggedin.subscribe(
      (value) => {
        this.isLoggedIn = !!value;
      }
    );
    this.isInLoginPageSub = this.logindetailService.isinLoginPage.subscribe(
      value => {
        this.isInLoginPage = !!value;
      }
    );
  }
  ngOnDestroy() {
    this.loggedinSubscription.unsubscribe();
    this.isInLoginPageSub.unsubscribe();
  }

  onLogout() {
    this.isLoggedIn = false;
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

  onLogin() {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }
}
