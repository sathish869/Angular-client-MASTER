import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { universalStoreOfState } from 'src/app/appStore/app-store.module';
import { authActions } from '../auth_store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  urlSub = new Subscription();
  storeSub = new Subscription();
  isInLoginPage: boolean;
  isLoggedIn: boolean = false;
  constructor(
    private store: Store<universalStoreOfState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.urlSub = this.router.events.subscribe((Allevents) => {
      if (Allevents instanceof NavigationStart) {
        if (Allevents['url'] === '/login') {
          this.isInLoginPage = true;
        } else {
          this.isInLoginPage = false;
        }
      }
    });
    this.storeSub = this.store.select('authState').subscribe((authState) => {
      if (authState.userData === null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    });
  }
  ngOnDestroy() {
    this.urlSub.unsubscribe();
    this.storeSub.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(authActions.logout());
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

  onLogin() {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }
}