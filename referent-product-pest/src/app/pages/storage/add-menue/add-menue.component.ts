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
  selector: 'app-add-menue',
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
  templateUrl: './add-menue.component.html',
  styleUrl: './add-menue.component.scss'
})
export class AddMenueComponent {

  private navService = inject(NavService);
  public navConfig = this.navService.config;
  private breakpointObserver = inject(BreakpointObserver);
  title = 'Add Menue';


    constructor(
      private router: Router,
      // private navegateService: NavegateService,
      // private authService: AuthService,
      // private matIconRegistry: MatIconRegistry,
      // private domSanitizer: DomSanitizer
    ){
          this.setNav();
    }


  goAddNew(): void {
    const routeBase = "app/storage/products/add/new";
    this.navigate(routeBase);
  }

  goAdditionOfProduct(): void {
    const routeBase = "app/storage/products/add/product";
    this.navigate(routeBase);
  }


    navigate(routeBase: string) {
    this.router.navigate([routeBase]);
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
    navConfig.goto = 'app/storage/products';
    this.navService.setNavConfig(navConfig);
  }


}
