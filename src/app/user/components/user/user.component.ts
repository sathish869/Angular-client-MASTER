import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDetails, UsersDetails } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { universalStoreOfState } from 'src/app/app/app-store/app-store.module';
import { userListAction } from '../../stores/user-list-store/userList.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  usersLoading: boolean = false;
  loadedUsers: UsersDetails[] =[];
  currentUser: UserDetails | null =null;
  userComponentSub = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private store: Store<universalStoreOfState>
  ) {}
  ngOnDestroy(): void {
    this.store.dispatch(userListAction.RemoveLoadedUser());
    this.userComponentSub.unsubscribe();
  }
  ngOnInit(): void {
    if (this.loadedUsers.length === 0) {
      this.store.dispatch(userListAction.retrieveUsersData());
    }
    const currentUserSub = this.store
      .select('authState')
      .subscribe((authState) => {
        this.currentUser = authState.userData ? authState.userData : null;
      });
    const usersSub = this.store.select('usersState').subscribe((usersState) => {
      this.loadedUsers = usersState.usersData ? usersState.usersData : [];
      this.usersLoading = usersState.loadingFlag;
      if (usersState.error) {
        this.matSnackBar.open(usersState.error);
      }
    });
    this.userComponentSub.add(currentUserSub);
    this.userComponentSub.add(usersSub);
  }
  onLoadUserDetail(userName: string) {
    console.log('onLoadUserDetail', userName);
    this.router.navigate([userName], { relativeTo: this.route });
  }
}
