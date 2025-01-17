import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HomepageComponent } from './homepage/homepage.component'
import { JobsComponent } from './jobs/jobs.component';
import { ProfileComponent } from './profile/profile.component';
import { ApplicationsComponent } from './applications/applications.component';
import { SavedjobsComponent } from './savedjobs/savedjobs.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Materials
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    JobsComponent,
    ProfileComponent,
    ApplicationsComponent,
    SavedjobsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // Materials
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
