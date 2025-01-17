import { Component } from '@angular/core';
import { JobsService } from '../services/jobs.service';

interface UserType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(public jobService: JobsService) {}

  selectedType: UserType | null = null;
  selectedJobRole: string = '';

  userTypes: UserType[] = [
    { value: 'employee', viewValue: 'Employee' },
    { value: 'employer', viewValue: 'Employer' },
  ];

  onTypeChange(type: any) {
    this.selectedType = type;
  }
}
