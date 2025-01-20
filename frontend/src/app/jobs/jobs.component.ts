import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-jobs',
  standalone: false,
  
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss'
})
export class JobsComponent implements OnInit {

  constructor(private jobsService: JobsService, private authService: AuthService) {}

  currentUser: any;

  jobs: any[] = []

  isLoading = true;

  ngOnInit(): void {
    this.jobsService.getAllJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching jobs', err);
      }
    });

    this.currentUser = this.authService.getCurrentUser().user
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  getTruncatedText(text: string, limit: number = 400): string {
    return text.length > limit ? text.slice(0, limit) + ' [...]' : text;
  }
}
