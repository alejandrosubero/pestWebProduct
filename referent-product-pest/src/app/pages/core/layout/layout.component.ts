import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { NavegateService } from '../../../services/navegate.service';
import { AuthService } from '../../../services/auth.service';
import { NavService } from '../../../services/nav.service';
import { NavConfig } from '../../../models/navElemet.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
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
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent  implements OnInit {

  private navService = inject(NavService);
  public navConfig = this.navService.config;
  private breakpointObserver = inject(BreakpointObserver);

  constructor(
    private router: Router,
    private navegateService: NavegateService,
    private authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer

  ){ 
    this.matIconRegistry.addSvgIcon( 'sds', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/sds.svg') );
    this.matIconRegistry.addSvgIcon( 'label', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/label.svg') );

     effect(() => {
      this.navConfig = this.navService.config;
     });
  }

  ngOnInit(): void {
   
  }


 // ======= isHandset =============== //
  getAnimationState(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([
    Breakpoints.Handset,
    Breakpoints.Small,
    '(max-width: 768px)'
  ]).pipe(
    map(result => result.matches),
    shareReplay()
  );
 // ======= ********** =============== //



 // ======= navegate =============== //

  navigate(routeBase:string){
    this.router.navigate([routeBase]);
  }

    goFavorites(): void {
      if (this.navConfig().favorite.viewDetail) {
        let value = this.navConfig().favorite.toggleFavorite ? false : true;
        this.navService.updateToggleFavorite(value);
      } else {
          this.navegateService.goFavorites('favorites', 1);
      }
  }


  //  ============ buto ================
     goTecnnical(sidenav:any): void {
     const routeBase = "app/technical/notes";
      sidenav.toggle();
    this.navigate(routeBase);
  }

   goCompareTecnnical(sidenav:any): void {
     const routeBase = "app/technical/notes/compare";
      sidenav.toggle();
    this.navigate(routeBase);
  }

   goAbout(sidenav:any): void {
     const routeBase = 'app/about';
     sidenav.toggle();
    this.navigate(routeBase);
  }
  
   goMix(sidenav:any): void {
    const routeBase = 'app/technical/notes/mix';
     sidenav.toggle();
    this.navigate(routeBase);
  }

     goHome(sidenav:any): void {
     const routeBase = "app/home";
      sidenav.toggle();
    this.navigate(routeBase);
  }
//  ============ ********** ================

//  ============ logout and back================
    logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

    back(): void {

      if(this.navConfig().goto === 'app/favorites'){
         this.navegateService.goFavorites('favorites', 1);
      }else{
        this.navigate(this.navConfig().goto);
      }

      if(this.navConfig().goto === 'formulations' &&  this.navConfig().favorite.url === 'formulations'){
        this.navegateService.goFavorites('formulations', this.navConfig().favorite.id);
      }

      
  }

 // ======= ********** =============== //

  // ======= PDF secction =============== //
  viewPdf(): void {
    let url: string = this.navConfig().label;
    debugger
    window.open(url, '_blank');
  }

  viewSdS(): void {
    let url: string = this.navConfig().sds;
    window.open(url, '_blank');
  }

   downloadPdf(): void {
    const pdfUrl = this.navConfig().label;
    const pdfName = `${new Date()}.pdf`;
    // Crea un enlace temporal.
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfName;
    link.click();
    link.remove();
  }

  // ======= ********** =============== //
}
