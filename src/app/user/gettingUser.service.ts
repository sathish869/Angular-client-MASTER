import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject } from 'rxjs';
import { userDetails, usersDetails } from '../user.model';

@Injectable({ providedIn: 'root' })
export class gettingUserService {
  public userClicked = new Subject<userDetails>();
  public usersLoading = new BehaviorSubject<boolean>(false);
  public userEmitter = new BehaviorSubject<usersDetails[]>(null);
  public currentUserEmitter=new BehaviorSubject<userDetails[]>(null);

  constructor(private http: HttpClient, private matSnackBar: MatSnackBar) {
    this.onLoadUsers();
  }

  onLoadUsers() {
    this.usersLoading.next(true);
    this.http.get<usersDetails[]>('https://api.github.com/users').subscribe(
      (responseData) => {
        this.userEmitter.next(responseData);
        this.usersLoading.next(false);
      },
      (error) => {
        this.onErrorHandle(error);
      }
    );
  }
  onErrorHandle(error: string) {
    this.matSnackBar.open(error);
  }
}
