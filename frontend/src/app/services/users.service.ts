import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiBaseUrl = 'http://localhost:3000/api/profile';

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('Bearer Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.get<any>(`${this.apiBaseUrl}/me`, { headers });
  }

  updateUserProfile(updates: any): Observable<any> {
    const token = localStorage.getItem('Bearer Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.patch<any>(`${this.apiBaseUrl}/me`, updates, { headers });
  }

  deleteExperience(experienceId: string): Observable<any> {
    const token = localStorage.getItem('Bearer Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.delete<any>(`${this.apiBaseUrl}/experience/${experienceId}`, { headers });
  }

  deleteLanguage(languageId: string): Observable<any> {
    const token = localStorage.getItem('Bearer Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.delete<any>(`${this.apiBaseUrl}/language/${languageId}`, { headers });
  }

  deleteEducation(educationId: string): Observable<any> {
    const token = localStorage.getItem('Bearer Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.delete<any>(`${this.apiBaseUrl}/education/${educationId}`, { headers });
  }

  deleteSkill(skillId: string): Observable<any> {
    const token = localStorage.getItem('Bearer Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.delete<any>(`${this.apiBaseUrl}/skill/${skillId}`, { headers });
  }
  
}
