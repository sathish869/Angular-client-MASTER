import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginDetailService } from '../../../user/services/login-detail.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  loggedInSub: Subscription = new Subscription();
  isInLoginPage: boolean;
  isLoggedIn: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginDetailService: LoginDetailService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        if (events.url === '/login') {
          this.isInLoginPage = true;
        } else {
          this.isInLoginPage = false;
        }
      }
    });
    this.loggedInSub = this.loginDetailService.isLoggedIn.subscribe(
      (value: boolean) => {
        this.isLoggedIn = value;
      }
    );
  }
  ngOnDestroy(): void {
    this.loggedInSub.unsubscribe();
  }

  onLogout(): void {
    this.loginDetailService.isLoggedIn.next(false);
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

  onLogin(): void {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }
}
