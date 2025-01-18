import { Component, OnInit  } from '@angular/core';
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
  animations: [fader]
})
export class AppComponent implements OnInit {
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  currentUser: any;

  constructor(public jobsService: JobsService, private router: Router, public authService: AuthService, private usersService: UsersService) {}  
  title = 'frontend';
  private routerSubscription: Subscription = new Subscription();

  isExpanded: boolean = false;
  isLoggedIn: boolean = false;

  ngOnInit():void {
    this.jobsService.loadFilters();
    this.currentUser = JSON.parse(localStorage.getItem('User') || '{}')
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

  signOut(): void {
    console.log('Calling signOut...');
    this.currentUser = '';
    this.authService.signOut();
    console.log('User signed out');
  }
}