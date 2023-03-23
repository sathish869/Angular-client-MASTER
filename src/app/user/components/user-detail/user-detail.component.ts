import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserDetails } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { universalStoreOfState } from 'src/app/app/app-store/app-store.module';
import {
  CustomizedRepoDetail,
  RepositoryDetail,
} from '../../models/repo-detail.model';
import { userDetailActions } from '../../stores/user-detail-store/userDetail.actions';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  clickedUser: UserDetails | null;
  userLoading: boolean = true;
  clickedUserRepo: RepositoryDetail[] = null;
  filteredUserRepo: CustomizedRepoDetail[] = [];
  UserDetailComponentSub = new Subscription();
  pageSize: number = 5;
  dataSource = new MatTableDataSource<CustomizedRepoDetail>();
  columnName: string[] = [
    'repoName',
    'repoDescription',
    'stars_count',
    'watchers_count',
    'created_date',
    'updated_date',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store<universalStoreOfState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    const currentUserSub = this.store
      .select('authState')
      .subscribe((authState) => {
        if (authState.userData !== null) {
          this.clickedUser = authState.userData[0]
            ? authState.userData[0]
            : null;
          this.clickedUserRepo = authState.userData[1]
            ? authState.userData[1]
            : null;
        }
      });
    const clickedUserSub = this.store
      .select('userDetailState')
      .subscribe((userDetailState) => {
        if (userDetailState.clickedUser !== null) {
          this.clickedUser = userDetailState.clickedUser[0]
            ? userDetailState.clickedUser[0]
            : null;
          this.clickedUserRepo = userDetailState.clickedUser[1]
            ? userDetailState.clickedUser[1]
            : null;
        }
        this.userLoading = userDetailState.loadingFlag;
        this.onFetchRequiredDetail();
        this.dataSource = new MatTableDataSource<CustomizedRepoDetail>(
          this.filteredUserRepo
        );
        setTimeout(() => (this.dataSource.paginator = this.paginator));
        setTimeout(() => (this.dataSource.sort = this.sort));
      });
    this.UserDetailComponentSub.add(currentUserSub);
    this.UserDetailComponentSub.add(clickedUserSub);
  }

  onReturnToUser(): void {
    this.router.navigate(['/users'], { relativeTo: this.route });
  }
  onFetchRequiredDetail(){
    if(this.clickedUserRepo !== null){ 
      for( let i=0;i< this.clickedUserRepo.length;i++){
        let filteredUserRepoObj:CustomizedRepoDetail=null;
        console.log(this.clickedUserRepo[i].name)
         filteredUserRepoObj={
          repoName:this.clickedUserRepo[i].name ? this.clickedUserRepo[i].name :'',
          repoDescription: this.clickedUserRepo[i].description ?this.clickedUserRepo[i].description : '',
          stars_count: this.clickedUserRepo[i].stargazers_count ? this.clickedUserRepo[i].stargazers_count :0,
          watchers_count: this.clickedUserRepo[i].watchers_count ? this.clickedUserRepo[i].watchers_count :0,
          created_date: this.clickedUserRepo[i].created_at ? this.clickedUserRepo[i].created_at :null,
          updated_date: this.clickedUserRepo[i].updated_at ? this.clickedUserRepo[i].updated_at :null
        };
      this.filteredUserRepo.push(filteredUserRepoObj);
      }
    }
  }

  ngOnDestroy(): void {
    this.clickedUser = null;
    this.UserDetailComponentSub.unsubscribe();
    this.store.dispatch(userDetailActions.deleteClickedUser());
  }
}
