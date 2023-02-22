import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { universalStoreOfState } from '../appStore/app-store.module';
import { userDetails, usersDetails } from '../user.model';
import { userDetailActions } from './user-detail/userDetail_store/userDetail.actions';
import { userListAction } from './userList_store/userList.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  usersLoadingFlag: boolean;
  loadedUsers: usersDetails[]=null;
  currentUser: userDetails;
  usersSub = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private store: Store<universalStoreOfState>
  ) {}

  ngOnDestroy(): void {
    this.store.dispatch(userListAction.RemoveLoadedUser());
    this.usersSub.unsubscribe();
  }

  ngOnInit(): void {
    if (this.loadedUsers === null) {
      this.store.dispatch(userListAction.retrieveUsersData());
    }
    const currentUserSub=this.store.select('authState').subscribe((authState)=>{
        this.currentUser=authState.userData?authState.userData:null;
    })
    const usersSub = this.store.select('usersState').subscribe((usersState) => {
      this.loadedUsers = usersState.usersData ? usersState.usersData : [];
      this.usersLoadingFlag = usersState.loadingFlag;
      if (usersState.error) {
        this.matSnackBar.open(usersState.error);
      }
    });
  }
  onLoadUserDetail(userName: string) {
    this.matSnackBar.dismiss();
    console.log('onLoadUserDetail', userName);
    this.router.navigate([userName], { relativeTo: this.route });
  }
}