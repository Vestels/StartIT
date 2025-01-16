import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  isExpanded: boolean = false;

  toogleExpandValue(): void {
    this.isExpanded = !this.isExpanded
  }
}
