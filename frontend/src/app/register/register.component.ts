import { Component } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(public jobService: JobsService, private authService: AuthService, private router: Router) {}

  errorMessage: string = '';

  selectedType: UserType | null = null;
  selectedJobRole: string = '';

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  userTypes: UserType[] = [
    { value: 'employee', viewValue: 'Employee' },
    { value: 'employer', viewValue: 'Employer' },
  ];

  onTypeChange(type: any) {
    this.selectedType = type;
  }

  register() {
    if(this.selectedType?.value === 'Employer' && !this.selectedJobRole) {
      this.selectedJobRole === 'employer'
    }

    if(!this.selectedType || !this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill all required fields!'

      if(this.password != this.confirmPassword) {
        this.errorMessage = 'Passwords do not match!'
      }
  
    } else {
      const data: any = {
        email: this.email,
        password: this.password,
        userType: this.selectedType.value,
        name: this.name,
        company_name: this.name,
        profession: this.selectedJobRole
      }
      this.authService.register(data).subscribe(
        (response) => {
          console.log('Registration sussessfull.', response);
          localStorage.setItem('Bearer Token', response.token)
          this.clearForm()
          this.router.navigate(['/login'])
        },
        (error) => {
          console.error('Registration failed.', error)
        }
      )
    }
  }

  clearForm() {
    this.selectedType = null
    this.selectedJobRole =''
    this.name =''
    this.email =''
    this.password =''
    this.confirmPassword =''
  }
}
