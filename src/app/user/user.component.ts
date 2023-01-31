import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  usersDetails } from '../user.model';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  value: any;
  usersLoading: boolean = false;
  loadedUsers: usersDetails[] = [];

  constructor(private http: HttpClient,
    private matSnackBar:MatSnackBar) {
    this.onLoadUsers();
  }
  onLoadUsers() {
    this.usersLoading = true;
    this.http
      .get<usersDetails[]>('https://api.github.com/users')
      .subscribe((responseData) => {
        this.loadedUsers = responseData.length ? responseData : [];
        console.log(responseData);
        this.usersLoading = false;
      },error=>{
        this.onErrorHandle(error);
      });
  }
  onErrorHandle(error:string){
      this.matSnackBar.open(error);
  }
}
