import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userDetails } from './user.model';

@Injectable({ providedIn: 'root' })
export class tokenShareService {
  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }
  
  onValidateToken(token: string) {
    return this.http.get<userDetails>('https://api.github.com/user', {
      headers: { Authorization: 'Bearer ' + token },
    });
  }
}
