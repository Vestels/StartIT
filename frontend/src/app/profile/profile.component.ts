import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { JobsService } from '../services/jobs.service';
import { AppComponent } from '../app.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  standalone: false,

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private jobsService: JobsService,
    public appComponent: AppComponent
  ) {}

  currentUser: any;
  jobRoles: any[] = [];
  experienceLevels: any[] = [];
  userEducations: any[] = [];

  toggleNameEdit: boolean = false;

  updatedUserName: string = '';
  selectedJobRole: any;
  selectedExperienceLevel: any;
  updatedIntroduction: string = '';

  initialExperiences: any[] = [];
  initialLanguages: any[] = [];
  initialEducations: any[] = [];
  initialSkills: any[] = [];

  experiences: any[] = [];
  languages: any[] = [];
  educations: any[] = [];
  skills: any[] = [];

  fileName: string | null = null;

  isLoading: boolean = true;

  async ngOnInit(): Promise<void> {
    this.usersService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.updatedIntroduction = user.introduction;
        this.experiences = user.userExperiences;
        this.initialExperiences = _.cloneDeep(user.userExperiences);
        this.languages = user.userLanguages;
        this.initialLanguages = _.cloneDeep(user.userLanguages);
        this.educations = user.userEducations;
        this.initialEducations = _.cloneDeep(user.userEducations);
        this.skills = user.userSkills;
        this.initialSkills = _.cloneDeep(user.userSkills);

        if (localStorage.getItem('scrollToTop') === 'true') {
          localStorage.removeItem('scrollToTop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
        this.isLoading = false;
      },
    });

    this.jobsService.getFilters().subscribe({
      next: (data) => {
        this.jobRoles = data.jobRoles;
        this.experienceLevels = data.experiences;
        this.userEducations = data.educations;
      },
      error: (error) => {
        console.error('Error fetching filters:', error);
      },
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  getNameBasedOnId(id: number, list: any[]): string {
    const item = list.find((item) => item.id === id);
    return item ? item.name : '';
  }

  getInitials(name: string): string {
    return name
      ?.split(' ')
      .map((word) => word[0])
      .join('');
  }

  toggleNameEditForm(): void {
    this.toggleNameEdit = !this.toggleNameEdit;
    this.updatedUserName = '';
  }

  addExperience(): void {
    const newExperience = {
      company: '',
      role: '',
      from: this.formatDate(new Date().toISOString()),
      to: this.formatDate(new Date().toISOString()),
      description: '',
    };
    this.experiences.unshift(newExperience);
  }

  removeExperience(index: number): void {
    const experience = this.experiences[index];
    if(experience) {
      this.usersService.deleteExperience(experience.id).subscribe({
        next: (data) => {
          console.log('Deleted experience:', data);
        },
        error: (error) => {
          console.error('Error deleting experience:', error);
        },
      })
    }
    this.experiences.splice(index, 1);
  }

  addLanguage(): void {
    const newLanguage = {
      language: '',
      proficiency: '',
    };
    this.languages.unshift(newLanguage);
  }

  removeLanguage(index: number): void {
    const language = this.languages[index];
    if(language.id) {
      this.usersService.deleteLanguage(language.id).subscribe({
        next: (data) => {
          console.log('Deleted language:', data);
        },
        error: (error) => {
          console.error('Error deleting language:', error);
        },
      })
    }
    this.languages.splice(index, 1);
  }

  addEducation(): void {
    const newEducation = {
      institution: '',
      degree: null,
      from: this.formatDate(new Date().toISOString()),
      to: this.formatDate(new Date().toISOString()),
    };
    this.educations.unshift(newEducation);
  }

  removeEducation(index: number): void {
    const education = this.educations[index];
    if(education.id) {
      this.usersService.deleteEducation(education.id).subscribe({
        next: (data) => {
          console.log('Deleted education:', data);
        },
        error: (error) => {
          console.error('Error deleting education:', error);
        },
      })
    }
    this.educations.splice(index, 1);
  }

  addSkill(): void {
    const newSkill = {
      name: '',
    };
    this.skills.unshift(newSkill);
  }

  removeSkill(index: number): void {
    const skill = this.skills[index];
    if(skill.id) {
      this.usersService.deleteSkill(skill.id).subscribe({
        next: (data) => {
          console.log('Deleted skill:', data);
        },
        error: (error) => {
          console.error('Error deleting skill:', error);
        },
      })
    }
    this.skills.splice(index, 1);
  }

  updateUser(): void {
    const updates: any = {};

    if (this.updatedUserName) {
      updates.name = this.updatedUserName;
    }

    if (this.selectedJobRole) {
      updates.profession = this.selectedJobRole.id;
    }

    if (
      this.updatedIntroduction &&
      this.updatedIntroduction !== this.currentUser.introduction
    ) {
      updates.introduction = this.updatedIntroduction;
    }

    if (this.selectedExperienceLevel) {
      updates.level = this.selectedExperienceLevel.id;
    }

    //
    if (!_.isEqual(this.experiences, this.initialExperiences)) {
      updates.experiences = this.experiences;
    }

    if(!_.isEqual(this.languages, this.initialLanguages)) {
      updates.languages = this.languages;
    }

    if(!_.isEqual(this.educations, this.initialEducations)) {
      for (const education of this.educations) {
        if (education.degree.id) {
          education.degree = education.degree.id;
        }
      }
      updates.educations = this.educations;
    }

    if(!_.isEqual(this.skills, this.initialSkills)) {
      updates.skills = this.skills;
    }

    console.log(updates);
    
    if (Object.keys(updates).length > 0) {
      this.usersService.updateUserProfile(updates).subscribe({
        next: (user) => {
          this.currentUser = user;
          localStorage.setItem('User', JSON.stringify(user));
          this.appComponent.currentUser = this.currentUser;
          localStorage.setItem('scrollToTop', 'true');
          window.location.reload()
        },
        error: (error) => {
          console.error('Error updating user:', error);
        },
      });
    } else {
      console.log('No changes made to the user profile.');
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileName = input.files[0].name;
    } else {
      this.fileName = null;
    }
  }
}
