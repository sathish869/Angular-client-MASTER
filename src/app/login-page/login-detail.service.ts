import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { userDetails } from "../user.model";

@Injectable({ providedIn: 'root' })
export class loginDetailService{
    public isLoggedin = new Subject<boolean>();
    public isinLoginPage = new Subject<boolean>();
    public currentUser=new BehaviorSubject<userDetails | null>(null);
}