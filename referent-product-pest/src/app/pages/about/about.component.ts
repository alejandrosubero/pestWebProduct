import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  title: string = 'About this App';
  appName = 'PestProduct';
  version = '3.1.0';
  author = 'Alejandro';
  email = 'alex295226@gmail.com';

  features = [
    'Product Management',
    'Product Comparison',
    'Automatic Reports',
    'Modern and Responsive Interface'
  ];

  technologies = [
    'Angular 17',
    'Angular Material 17',
    'TypeScript',
    'Node.js',
    'SCSS'
  ];

  supportLinks = [
    // { label: 'Documentation', url: '#' },
    { label: 'GitHub', url: 'https://github.com/alejandrosubero/pestWebProduct' },
    { label: 'Contact Support', url: 'mailto:alex295226@gmail.com' }
  ];

  constructor(
      private router: Router
    ) {
    
    }

    back(): void {
    this.router.navigate(['/home']);

  }
}
