import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersDetails } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenShareService } from '../../services/token-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit,OnDestroy {
  usersLoading: boolean = false;
  loadedUsers: UsersDetails[] = [];

  constructor(
    private router: Router,
    private matSnackBar: MatSnackBar,
    private tokenShareService: TokenShareService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  ngOnDestroy(): void {
    this.tokenShareService.tokenEmitter.next('');
  }

  loadUsers(): void {
    this.usersLoading = true;
    this.tokenShareService.loadUsers().subscribe({
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
}
