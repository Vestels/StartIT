import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) {}

  jobs: any[] = []

  educations: any[] = []
  employments: any[] = []
  experiences: any[] = []
  jobRoles: any[] = []
  locations: any[] = []

  getFilters(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/filters');
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
}