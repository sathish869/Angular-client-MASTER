import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { loginDetailService } from '../login-page/login-detail.service';
import { userDetails, usersDetails } from '../user.model';
import { gettingUserService } from './gettingUser.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit,OnDestroy {

  usersLoading: boolean;
  loadedUsers: usersDetails[];
  currentUser:userDetails;
  currentUserSub=new Subscription;
  usersLoadingSub=new Subscription;
  userEmitterSub=new Subscription;
  

  constructor(private gettingUserService: gettingUserService,
    private router: Router,
    private route: ActivatedRoute,
    private matSnackBar:MatSnackBar,
    private loginDetailService:loginDetailService) {}

  ngOnDestroy(): void {
    this.usersLoadingSub.unsubscribe();
    this.userEmitterSub.unsubscribe();
  }

  ngOnInit(): void {
    this.usersLoadingSub=this.gettingUserService.usersLoading.subscribe((value) => {
      this.usersLoading = value;
    });
    this.userEmitterSub=this.gettingUserService.userEmitter.subscribe((value) => {
      this.loadedUsers = value;
    });
    this.currentUserSub=this.loginDetailService.currentUser.subscribe((value) => {
      this.currentUser=value;
    });
  }

  onLoadUserDetail(userName:string){
    this.matSnackBar.dismiss();
    console.log("onLoadUserDetail",userName)
    this.router.navigate([userName], { relativeTo: this.route }); 
  }
}
