import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavegateService } from '../../../services/navegate.service';
import { AuthService } from '../../../services/auth.service';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavService } from '../../../services/nav.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NavConfig } from '../../../models/navElemet.model';

@Component({
  selector: 'app-field-card',
  standalone: true,
  imports: [
      CommonModule,
        RouterModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule
  ],
  templateUrl: './field-card.component.html',
  styleUrl: './field-card.component.scss'
})
export class FieldCardComponent implements OnInit{

  private navService = inject(NavService);
  public navConfig = this.navService.config;
  private breakpointObserver = inject(BreakpointObserver);
  title = 'Field-LAB';
    constructor(
      private router: Router,
      private navegateService: NavegateService,
      private authService: AuthService,
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer
    ){
          this.setNav();
    }

  ngOnInit(): void { }



  //  ============ buto ================
  goTecnnical(): void {
    const routeBase = "app/technical/notes";
    this.navigate(routeBase);
  }

  goCompareTecnnical(): void {
    const routeBase = "app/technical/notes/compare";
    this.navigate(routeBase);
  }

   goMix(): void {
    const routeBase = 'app/technical/notes/mix';
    this.navigate(routeBase);
  }

  gochecklist(): void {
    const routeBase = 'app/lab/test/checklist';
    this.navigate(routeBase);
  }

  goJarTest(): void {
    const routeBase = 'app/lab/test/jar';
    this.navigate(routeBase);
  }

  goHome(): void {
    const routeBase = "app/home";
    this.navigate(routeBase);
  }

    navigate(routeBase: string) {
    this.router.navigate([routeBase]);
  }


  setNav(): void {
    this.navService.reSetNavConfig();

    let navConfig: NavConfig = new NavConfig();
    navConfig.title = this.title;
    navConfig.ico.menu = true;
    navConfig.ico.back = false;
    navConfig.ico.favorite = false;
    navConfig.ico.logut = false;
    navConfig.ico.label = false;
    navConfig.ico.sds = false;

    navConfig.goto = 'app/home';
    this.navService.setNavConfig(navConfig);
  }

}
