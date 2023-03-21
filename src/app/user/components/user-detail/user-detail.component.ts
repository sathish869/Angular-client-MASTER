import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserDetails } from '../../models/user.model';
import { universalStoreOfState } from 'src/app/app/app-store/app-store.module';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  clickedUser: UserDetails | null;
  userLoading: boolean = true;
  UserDetailComponentSub = new Subscription();

  constructor(
    private store: Store<universalStoreOfState>,
    private route: ActivatedRoute,
    private router: Router
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
        this.userLoading = userDetailState.loadingFlag;
      });
    this.UserDetailComponentSub.add(currentUserSub);
    this.UserDetailComponentSub.add(clickedUserSub);
  }

  onReturnToUser(): void {
    this.router.navigate(['/users'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.clickedUser = null;
    this.UserDetailComponentSub.unsubscribe();
  }
}
