import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { NavService } from '../../services/nav.service';
import { NavConfig } from '../../models/navElemet.model';

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
 private navService = inject(NavService);
  title: string = 'About this App';
  appName = 'PestProduct';
  version = '4.0.0';
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

  constructor(private router: Router) {
    this.setNav();
  }

    back(): void {
    this.router.navigate(['app/home']);
  }

   setNav(): void {
        this.navService.reSetNavConfig();
        let navConfig: NavConfig = new NavConfig();
        navConfig.title = this.title;
        navConfig.ico.menu = false;
        navConfig.ico.back = true;
        navConfig.ico.favorite = false;
        navConfig.ico.logut = false;
        navConfig.ico.label = false;
        navConfig.ico.sds = false;
        navConfig.goto = 'app/home';
        this.navService.setNavConfig(navConfig);
      }
}
