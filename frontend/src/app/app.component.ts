import { Component, OnInit, Renderer2 } from '@angular/core';
import { JobsService } from './services/jobs.service';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { fader } from './route-animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
  animations: [fader],
})
export class AppComponent implements OnInit {
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
  currentUser: any;

  isJobBoardOpen: boolean = false;
  isAnyFieldsEmpty: boolean = false;
  isVisible: boolean = true;

  constructor(
    public jobsService: JobsService,
    private router: Router,
    public authService: AuthService,
    private usersService: UsersService,
    private renderer: Renderer2
  ) {}
  title = 'frontend';
  private routerSubscription: Subscription = new Subscription();

  isExpanded: boolean = false;
  isLoggedIn: boolean = false;

  jobDescription: string = '';
  jobLocation: any;
  jobRole: any;
  jobEmployment: any;
  jobExperience: any;
  jobEducation: any;

  ngOnInit(): void {
    this.jobsService.loadFilters();
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isExpanded = false;
      }
    });

    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if (user && user?.user?.company_name) {
        this.isVisible = false;
      }
    });
  }

  toggleExpandValue(): void {
    this.isExpanded = !this.isExpanded;
  }

  openJobBoard(): void {
    this.isJobBoardOpen = true;
  }

  closeJobBoard(): void {
    this.isJobBoardOpen = false;
    this.isAnyFieldsEmpty = false;
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('job-post-block')) {
      this.closeJobBoard();
    }
  }

  signOut(): void {
    console.log('Calling signOut...');
    this.authService.signOut();
    this.isVisible = true;
    console.log('User signed out');
  }

  createJob(): void {
    const job: any = {};

    job.Employer = this.currentUser.user.id;

    if(this.jobDescription.length < 1 || !this.jobLocation || !this.jobRole || !this.jobEmployment || !this.jobExperience || !this.jobEducation) {
      this.isAnyFieldsEmpty = true;
      return;
    }

    job.Description = this.jobDescription;
    job.Location = this.jobLocation.id;
    job.Role = this.jobRole.id;
    job.Employment = this.jobEmployment.id;
    job.Experience = this.jobExperience.id;
    job.Education = this.jobEducation.id;
    
    console.log('Creating job...', job);

    this.jobsService.createJob(job).subscribe({
      next: (data) => {
        console.log('Job created', data);
        this.isAnyFieldsEmpty = false;
        this.closeJobBoard();
        window.location.reload()
      },
      error: (err) => {
        console.error('Error creating job', err);
      },
    });
  }
}