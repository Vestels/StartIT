import { Component, OnInit, Input } from '@angular/core';
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

  @Input() selectedEducations: string[] = [];
  @Input() selectedEmployments: string[] = [];
  @Input() selectedExperiences: string[] = [];
  @Input() selectedRoles: string[] = [];
  @Input() selectedLocations: string[] = [];

  // @Output() searchJobsEvent = new EventEmitter<void>();

  ngOnInit(): void {
    this.jobsService.getAllJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        this.isLoading = false;
        console.log('Jobs', this.jobs);
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
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }

  searchJobs(): void {
    const filters: any = {};
    if (this.selectedEducations.length) filters.education = this.selectedEducations;
    if (this.selectedEmployments.length) filters.employment = this.selectedEmployments;
    if (this.selectedExperiences.length) filters.experience = this.selectedExperiences;
    if (this.selectedRoles.length) filters.role = this.selectedRoles;
    if (this.selectedLocations.length) filters.location = this.selectedLocations;

    console.log(filters);
    

    // this.jobsService.searchJobs(filters).subscribe({
    //   next: (data) => {
    //     this.jobs = data;
    //     console.log('Filtered Jobs', this.jobs);
    //   },
    //   error: (err) => {
    //     console.error('Error fetching filtered jobs', err);
    //   }
    // });
  }
}
