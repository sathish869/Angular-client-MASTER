import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoginDetailService } from '../../../user/services/login-detail.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerCompSub: Subscription = new Subscription();
  isInLoginPage: boolean;
  isLoggedIn: boolean;
  constructor(
    private router: Router,
    private loginDetailService: LoginDetailService
  ) {}

  ngOnInit(): void {
    const eventsSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: any) => {
        if (event.url === '/login') {
          this.isInLoginPage = true;
        } else {
          this.isInLoginPage = false;
        }
      });
    const loggedInSub = this.loginDetailService.isLoggedIn.subscribe(
      (value: boolean) => {
        this.isLoggedIn = value;
      }
    );
    this.headerCompSub.add(eventsSub);
    this.headerCompSub.add(loggedInSub);
  }
  ngOnDestroy(): void {
    this.headerCompSub.unsubscribe();
  }

  logout(): void {
    this.loginDetailService.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }
  loadUsers(): void {
    this.router.navigate(['/users']);
  }
}
