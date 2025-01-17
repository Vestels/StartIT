import { Component, OnInit  } from '@angular/core';
import { JobsService } from './services/jobs.service';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  currentUser: any;

  constructor(public jobServices: JobsService, private router: Router, public authService: AuthService) {}  
  title = 'frontend';
  private routerSubscription: Subscription = new Subscription();

  isExpanded: boolean = false;
  isLoggedIn: boolean = false;

  ngOnInit():void {
    this.currentUser = JSON.parse(localStorage.getItem('User') || '{}')
    this.jobServices.loadFilters();
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isExpanded = false
      }
    });

    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  toogleExpandValue(): void {
    this.isExpanded = !this.isExpanded
  }

  signOut() {
    this.currentUser = null
    this.authService.signOut();
  }
}
