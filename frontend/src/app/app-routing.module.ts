import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component'
import { JobsComponent } from './jobs/jobs.component';
import { ProfileComponent } from './profile/profile.component';
import { ApplicationsComponent } from './applications/applications.component';
import { SavedjobsComponent } from './savedjobs/savedjobs.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard, authRedirectGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'main-page', pathMatch: 'full'},
  {path: 'jobs', component: JobsComponent},
  {path: 'main-page', component: HomepageComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  {path: 'applications', component: ApplicationsComponent, canActivate: [authGuard]},
  {path: 'saved-jobs', component: SavedjobsComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent, canActivate: [authRedirectGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [authRedirectGuard] },
  {path: '**', redirectTo: 'main-page', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
