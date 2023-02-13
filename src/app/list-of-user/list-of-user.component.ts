import { Component, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usersDetails } from '../user.model';

@Component({
  selector: 'app-list-of-user',
  templateUrl: './list-of-user.component.html',
  styleUrls: ['./list-of-user.component.css'],
})
export class ListOfUserComponent {
  value: string = '';
  usersLoading: boolean = false;
  loadedUsers: any = [];

  constructor(private http: HttpClient) {
    this.onLoadUsers();
  }
  onLoadUsers() {
    this.usersLoading = true;
    this.http
      .get<usersDetails[]>('https://api.github.com/users')
      .subscribe((responseData) => {
        this.loadedUsers = responseData;
        this.usersLoading = false;
        console.log('users loaded');
      });
  }
}
