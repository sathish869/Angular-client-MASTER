import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDetails } from '../../models/user.model';
import { LoginDetailService } from '../../services/login-detail.service';

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
    private loginDetailService: LoginDetailService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    const usersLoadingSub = this.loginDetailService.userDetailLoading.subscribe(
      (value: boolean) => {
        this.userLoading = value;
      }
    );
    const userFetchingSub = this.loginDetailService.clickedUser.subscribe(
      (value: UserDetails | null) => {
        this.clickedUser = value;
      }
    );
    this.UserDetailComponentSub.add(usersLoadingSub);
    this.UserDetailComponentSub.add(userFetchingSub);
  }

  onReturnToUser(): void {
    this.router.navigate(['/users'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.clickedUser = null;
    this.UserDetailComponentSub.unsubscribe();
  }
}
