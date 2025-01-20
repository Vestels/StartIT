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
  private currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('User') || '{}'));
  public currentUser$ = this.currentUserSubject.asObservable();
  

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('Bearer Token')
    if (token) {
      return true;
    }
    return false;
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

  loginUser(token: string, user: any): void {
    localStorage.setItem('Bearer Token', token);
    localStorage.setItem('User', JSON.stringify(user));
    this.isLoggedInSubject.next(true);
    this.currentUserSubject.next(user);
  }

  signOut(): void {
    localStorage.clear();
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

}
