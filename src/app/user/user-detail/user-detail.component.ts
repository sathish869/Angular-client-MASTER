import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { universalStoreOfState } from 'src/app/appStore/app-store.module';
import { CustomizedRepoDetail, RepoDetail } from 'src/app/model/repoDetail.model';
import { UserDetails } from 'src/app/model/user.model';
import {MatTableDataSource} from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { userDetailActions } from './userDetail_store/userDetail.actions';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  clickedUser: UserDetails=null;
  clickedUserRepo:RepoDetail[] =null;
  filteredUserRepo:CustomizedRepoDetail[]=[];
  usersLoading: boolean;
  currentUserSub = new Subscription();
  clickedUserSub = new Subscription();
  pageSize: number = 5;
  dataSource = new MatTableDataSource<CustomizedRepoDetail>;
  columnName: string[] = ['repoName', 'repoDescription', 'stars_count', 'watchers_count', 'created_date', 'updated_date'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<universalStoreOfState>
  ) {}
  ngOnInit(): void {
    this.currentUserSub = this.store
      .select('authState')
      .subscribe((authState) => {
        if(authState.userData !== null){
          this.clickedUser = authState.userData[0] ? authState.userData[0] : null;
        this.clickedUserRepo=authState.userData[1] ? authState.userData[1] : null;
        }
      });
    this.clickedUserSub = this.store
      .select('userDetailState')
      .subscribe((userDetailState) => {
        if(userDetailState.clickedUser !== null){
        this.clickedUser = userDetailState.clickedUser[0]? userDetailState.clickedUser[0]: null;
        this.clickedUserRepo=userDetailState.clickedUser[1]? userDetailState.clickedUser[1]: null;
        }
        this.usersLoading = userDetailState.loadingFlag; 
        this.onFetchRequiredDetail();
        this.dataSource = new MatTableDataSource<CustomizedRepoDetail>(this.filteredUserRepo);
        setTimeout(() => this.dataSource.paginator = this.paginator
        );
        setTimeout(() => this.dataSource.sort = this.sort);
        // this.dataSource.sort = this.sort;
        // if (userDetailState.error) {
        // }
      });
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
  onReturnToUser() {
    this.router.navigate(['/users'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.currentUserSub.unsubscribe();
    this.clickedUserSub.unsubscribe();
    this.store.dispatch(userDetailActions.deleteClickedUser());
  }
}