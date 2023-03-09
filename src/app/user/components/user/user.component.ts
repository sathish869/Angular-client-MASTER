import { Component } from '@angular/core';
import { UsersDetails } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tokenShareService } from '../../services/token-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  usersLoading: boolean = false;
  loadedUsers: UsersDetails[] = [];

  constructor(private router:Router,
    private matSnackBar: MatSnackBar,
    private tokenShareService: tokenShareService
  ) {
    this.onLoadUsers();
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
}
