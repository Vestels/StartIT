import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) {}

  private apiBaseUrl = environment.apiBaseUrl;

  jobs: any[] = []

  educations: any[] = []
  employments: any[] = []
  experiences: any[] = []
  jobRoles: any[] = []
  locations: any[] = []

  getFilters(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/filters`);
  }

  async loadFilters(): Promise<void> {
    this.getFilters().subscribe({
      next: (data) => {
        this.educations = data.educations;
        this.employments = data.employments;
        this.experiences = data.experiences;
        this.jobRoles = data.jobRoles;
        this.locations = data.locations;
      },
      error: (err) => {
        console.error('Error fetching filters', err);
      }
    });
  }

  getAllJobs(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/jobs`);
  }

  searchJobs(filters: any): Observable<any> {
    const params = new URLSearchParams(filters).toString();
    return this.http.get<any>(`${this.apiBaseUrl}/jobs/search?${params}`);
  }

  createJob(job: any): Observable<any> {
    const token = localStorage.getItem('Bearer Token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.post<any>(`${this.apiBaseUrl}/jobs`, job, { headers });
  }
}