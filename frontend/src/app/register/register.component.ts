import { Component } from '@angular/core';

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

  selectedType: UserType | null = null;

  userTypes: UserType[] = [
    { value: 'employee', viewValue: 'Employee' },
    { value: 'employer', viewValue: 'Employer' },
  ];

  onTypeChange(type: any) {
    this.selectedType = type;
  }
}
