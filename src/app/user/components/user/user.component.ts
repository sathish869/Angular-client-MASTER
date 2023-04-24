import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDetails, UsersDetails } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { NestedTreeControl } from '@angular/cdk/tree';
import { universalStoreOfState } from 'src/app/app/app-store/app-store.module';
import { userListAction } from '../../stores/user-tree-store/user-tree.actions';
import { NestedTreeDataSource } from '../../services/nested-tree.data-source';
import { UserNode } from '../../models/node-details.models';
import { TokenShareService } from '../../services/token-share.service';
import { cloneDeep } from 'lodash';
import { userDetailActions } from '../../stores/user-detail-store/userDetail.actions';
import { treeDataSelector } from '../../stores/user-detail-store/userDetail.selector';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  usersLoading: boolean = false;
  loadedUsers: UsersDetails[] = [];
  currentUser: UserDetails | null = null;
  userComponentSub = new Subscription();
  nodeLoading: boolean = false;

  getLevel = (node: UserNode) => (node.level === 0 ? true : false);
  treeControl = new NestedTreeControl<UserNode>((node) => node.children);
  dataSource = new NestedTreeDataSource(
    this.treeControl,
    this.tokenShareService,
    this.matSnackBar
  );
  isLoading = (node: UserNode) => node.isLoading;
  hasChild = (_: number, node: UserNode) => (node.level == 0 ? true : false);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private tokenShareService: TokenShareService,
    private store: Store<universalStoreOfState>
  ) {}
  ngOnInit(): void {
    this.loadUsersData();
  }
  ngOnDestroy(): void {
    this.store.dispatch(
      userDetailActions.loadUserNodeData({ userTreeData: this.dataSource.data })
    );
    this.userComponentSub.unsubscribe();
  }
  loadUsersData(): void {
    this.store
      .select(treeDataSelector)
      .pipe(take(1))
      .subscribe((treeData) => {
        if (treeData.length !== 0) {
          this.dataSource.reloadTree(cloneDeep(treeData));
        } else {
          this.store.dispatch(userListAction.retrieveUsersData());
          const currentUserSub = this.store
            .select('authState')
            .subscribe((authState) => {
              this.currentUser = authState.userData ? authState.userData : null;
            });

          const usersSub = this.store
            .select('usersState')
            .subscribe((usersState) => {
              this.loadedUsers = usersState.usersData
                ? usersState.usersData
                : [];
              this.usersLoading = usersState.loadingFlag;
              this.onUserNodeCreation(this.loadedUsers);
              if (usersState.error) {
                this.matSnackBar.open(usersState.error);
              }
            });
          console.log(this.dataSource.data);
          this.userComponentSub.add(currentUserSub);
          this.userComponentSub.add(usersSub);
        }
      });
  }
  LoadUserDetail(userName: string) {
    console.log('onLoadUserDetail', userName);
    this.router.navigate([userName], { relativeTo: this.route });
  }
  onUserNodeCreation(usersData: UsersDetails[]): void {
    var userNodeArray: UserNode[] = [];
    for (let user of usersData) {
      userNodeArray.push({
        name: user.login,
        level: 0,
        logo: user.avatar_url,
        children: [],
      });
    }
    this.dataSource.data = userNodeArray;
  }
}
