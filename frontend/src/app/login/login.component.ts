import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private appComponent: AppComponent) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email or Password is missing!';
    } else {
      const data = {
        email: this.email,
        password: this.password
      };
      this.authService.login(data).subscribe(
        (response) => {
          console.log('Successfully logged in.', response);
          this.authService.loginUser(response.token, response.user);
          this.clearForm();
          this.router.navigate(['/jobs']);
        },
        (error) => {
          this.errorMessage = 'Email or Password is incorrect!';
        }
      );
    }
  }

  clearForm() {
    this.email = '';
    this.password = '';
  }
}