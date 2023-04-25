import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { UserDetails } from "../models/user.model";

@Injectable({ providedIn: 'root' })
export class LoginDetailService{
     isLoggedIn = new Subject<boolean>();
     currentUser=new BehaviorSubject<UserDetails | null>(null);
}