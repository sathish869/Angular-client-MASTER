import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDetails, UsersDetails } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tokenShareService } from '../../services/token-share.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginDetailService } from '../../services/login-detail.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  usersLoading: boolean = false;
  loadedUsers: UsersDetails[] = [];
  currentUser: UserDetails | null;
  currentUserSub = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private tokenShareService: tokenShareService,
    private loginDetailService: LoginDetailService
  ) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.onLoadUsers();
    this.currentUserSub = this.loginDetailService.currentUser.subscribe(
      (value: UserDetails | null) => {
        this.currentUser = value;
      }
    );
  }

  onLoadUsers(): void {
    this.usersLoading = true;
    this.tokenShareService.onLoadUsers().subscribe({
      next: (responseData: UsersDetails[]) => {
        this.loadedUsers = responseData.length ? responseData : [];
        console.log(responseData);
        this.usersLoading = false;
      },
      error: (error: string) => {
        this.matSnackBar.open(error);
        this.usersLoading = false;
        this.router.navigate(['/login']);
      },
    });
  }
  onLoadUserDetail(userName: string) {
    console.log('onLoadUserDetail', userName);
    this.router.navigate([userName], { relativeTo: this.route });
  }
}
