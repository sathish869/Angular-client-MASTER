import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { userDetails } from 'src/app/user.model';
import { gettingUserService } from '../gettingUser.service';

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
    private gettingUserService: gettingUserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.usersLoadingSub = this.gettingUserService.usersLoading.subscribe(
      (value) => {
        this.usersLoading = value;
      }
    );
  }
  ngOnInit(): void {
    this.gettingUserService.userClicked.subscribe((value) => {
      this.clickedUser = value;
    });
  }

  onReturnToUser() {
    this.router.navigate(['/users'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.usersLoadingSub.unsubscribe();
  }
}
