import { Component, OnInit  } from '@angular/core';
import { JobsService } from './services/jobs.service';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(public jobServices: JobsService, private router: Router) {}  
  title = 'frontend';
  private routerSubscription: Subscription = new Subscription();

  isExpanded: boolean = false;

  ngOnInit():void {
    this.jobServices.loadFilters();
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isExpanded = false
      }
    });
  }

  toogleExpandValue(): void {
    this.isExpanded = !this.isExpanded
  }
}
