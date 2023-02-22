import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { universalStoreOfState } from 'src/app/appStore/app-store.module';
import { userDetails } from 'src/app/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  clickedUser: userDetails;
  usersLoading: boolean;
  usersLoadingSub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<universalStoreOfState>
  ) {}
  ngOnInit(): void {
    const currentUserSub = this.store
      .select('authState')
      .subscribe((authState) => {
        this.clickedUser = authState.userData ? authState.userData : null;
      });
    const clickedUserSub = this.store
      .select('userDetailState')
      .subscribe((userDetailState) => {
        this.clickedUser = userDetailState.clickedUser
          ? userDetailState.clickedUser
          : null;
        this.usersLoading = userDetailState.loadingFlag;
      });
  }

  onReturnToUser() {
    this.router.navigate(['/users'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.usersLoadingSub.unsubscribe();
  }
}
