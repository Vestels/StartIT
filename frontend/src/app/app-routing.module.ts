import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component'
import { JobsComponent } from './jobs/jobs.component';
import { ProfileComponent } from './profile/profile.component';
import { ApplicationsComponent } from './applications/applications.component';
import { SavedjobsComponent } from './savedjobs/savedjobs.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard, authRedirectGuard, employerRedirectGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'main-page', pathMatch: 'full'},
  {path: 'jobs', component: JobsComponent, data: {animation: 'JobsPage'}},
  {path: 'main-page', component: HomepageComponent, data: {animation: 'MainPage'}},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard, employerRedirectGuard], data: {animation: 'ProfilePage'}},
  {path: 'applications', component: ApplicationsComponent, canActivate: [authGuard, employerRedirectGuard], data: {animation: 'ApplicationsPage'}},
  {path: 'saved-jobs', component: SavedjobsComponent, canActivate: [authGuard, employerRedirectGuard], data: {animation: 'SavedJobsPage'}},
  {path: 'login', component: LoginComponent, canActivate: [authRedirectGuard], data: {animation: 'LoginPage'}},
  {path: 'register', component: RegisterComponent, canActivate: [authRedirectGuard], data: {animation: 'RegisterPage'}},
  {path: '**', redirectTo: 'main-page', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
