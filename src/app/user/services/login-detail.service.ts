import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserDetails } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class LoginDetailService {
  public isLoggedIn = new Subject<boolean>();
  public currentUser = new BehaviorSubject<UserDetails | null>(null);
  public clickedUser = new Subject<UserDetails | null>();
  public userDetailLoading = new Subject<boolean>();
}
