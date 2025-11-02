import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { slideInAnimation } from './route-animations';
import { ProductService } from './services/product.service';
import { LayoutComponent } from './pages/core/layout/layout.component';
import { VersionCheckService } from './services/version-check.service';
import { PestsService } from './services/pests.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LayoutComponent],
  animations: [slideInAnimation],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'referent-product-pest';

   private versionService = inject(VersionCheckService);
   private pestsService = inject(PestsService);
   
  constructor() { }

  ngOnInit(): void {
    // this.versionService.initVersionCheck(false);
    this.pestsService.loadPests();
    this.versionService.initVersionCheck(true);
  }


  getAnimationState(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}


//ng build --configuration production