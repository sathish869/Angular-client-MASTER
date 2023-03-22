import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
<<<<<<< HEAD
import { Store } from '@ngrx/store';
import { universalStoreOfState } from 'src/app/app/app-store/app-store.module';
import { authActions } from 'src/app/user/stores/auth-store/auth.actions';
=======
import { tokenShareService } from 'src/app/user/services/token-share.service';
import { LoginDetailService } from '../../../user/services/login-detail.service';
>>>>>>> 3800e28f010a648eb81d94993486d85aad86e777

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
<<<<<<< HEAD
  HeaderComponentSub: Subscription = new Subscription();
  isInLoginPage: boolean;
  isLoggedIn: boolean;
  constructor(
    private store: Store<universalStoreOfState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const urlSub = this.router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        if (events.url === '/login') {
=======
  loggedInSub: Subscription = new Subscription();
  isInLoginPage: boolean;
  isLoggedIn: boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginDetailService: LoginDetailService,
    private tokenShareService: tokenShareService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        if (events.url === '/login') {
          this.tokenShareService.tokenEmitter.next('');
          this.loginDetailService.currentUser.next(null);
>>>>>>> 3800e28f010a648eb81d94993486d85aad86e777
          this.isInLoginPage = true;
        } else {
          this.isInLoginPage = false;
        }
      }
    });
    const storeSub = this.store.select('authState').subscribe((authState) => {
      if (authState.userData === null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    });
    this.HeaderComponentSub.add(urlSub);
    this.HeaderComponentSub.add(storeSub);
  }
  ngOnDestroy(): void {
    this.HeaderComponentSub.unsubscribe();
  }

  onLogout(): void {
    this.store.dispatch(authActions.logout());
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

  onLogin(): void {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }
  onLoadUsers(): void {
    this.router.navigate(['/users'], { relativeTo: this.route });
  }
}
