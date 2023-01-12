import { Component, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-list-of-user',
  templateUrl: './list-of-user.component.html',
  styleUrls: ['./list-of-user.component.css'],
})
export class ListOfUserComponent {
  value:any;
  usersLoading:boolean=false;
  loadedUsers: any = [];

  constructor(private http: HttpClient,
              ) {
    this.onLoadUsers();
    
  }
  onLoadUsers() {
   this.usersLoading=true;
    this.http
      .get('https://api.github.com/users')
      .subscribe((responseData) => {
        setTimeout(() => {
          this.loadedUsers = responseData;
          this.usersLoading=false;
        }, 2000);
        
        console.log('users loaded');
      });
  }
}
