import { Component, OnInit  } from '@angular/core';
import { JobsService } from './services/jobs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private jobServices: JobsService) {}  
  title = 'frontend';

  isExpanded: boolean = false;

  ngOnInit():void {
    this.jobServices.loadFilters();
  }

  toogleExpandValue(): void {
    this.isExpanded = !this.isExpanded
  }
}
