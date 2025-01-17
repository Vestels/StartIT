import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl = 'http://localhost:3000/api'
  public isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('Bearer Token')
    return !!token
  }

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

  loginUser(token: string): void {
    localStorage.setItem('Bearer Token', token);
    this.isLoggedInSubject.next(true);
  }

  // Kijelentkezés
  signOut(): void {
    window.location.reload();
    localStorage.clear()
    this.isLoggedInSubject.next(false);
  }

}
