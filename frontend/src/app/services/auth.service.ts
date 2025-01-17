import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  register( data: {
    email: string;
    password: string;
    userType: string;
    name: string;
    company_name: string;
    profession: number;
  }): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/users/register`, data)
  }

  login( data: { email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/users/login`, data)
  }

}
