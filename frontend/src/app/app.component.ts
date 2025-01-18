import { Component, OnInit  } from '@angular/core';
import { JobsService } from './services/jobs.service';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  currentUser: any;

  constructor(public jobsServices: JobsService, private router: Router, public authService: AuthService, private usersService: UsersService) {}  
  title = 'frontend';
  private routerSubscription: Subscription = new Subscription();

  isExpanded: boolean = false;
  isLoggedIn: boolean = false;

  ngOnInit():void {

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