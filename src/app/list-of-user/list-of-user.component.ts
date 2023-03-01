import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersDetails } from '../user.model';

@Component({
  selector: 'app-list-of-user',
  templateUrl: './list-of-user.component.html',
  styleUrls: ['./list-of-user.component.css'],
})
export class ListOfUserComponent implements OnInit {
  usersLoading: boolean = false;
  loadedUsers: UsersDetails[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.onLoadUsers();
  }
  onLoadUsers() {
    this.usersLoading = true;
    this.http
      .get<UsersDetails[]>('https://api.github.com/users')
      .subscribe((responseData) => {
        this.loadedUsers = responseData;
        this.usersLoading = false;
        console.log('users loaded');
      });
  }
}
