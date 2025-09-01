import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { PestData } from '../../models/pestdata.model';
import {FormulationsListComponent} from '../../pages/formulations-list/formulations-list.component'
import { NavegateService } from '../../services/navegate.service';
import { DBService } from '../../services/db.service';
import { DashboardComponent } from "../storage/dashboard/dashboard.component";
import { NavConfig } from '../../models/navElemet.model';
import { NavService } from '../../services/nav.service';
import { MagicNavComponent } from "../share/magic-nav/magic-nav.component";
import { TabType } from '../../models/tabtype.model';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    FormulationsListComponent,
    MatListModule, DashboardComponent, MagicNavComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit, AfterViewInit  {

 @ViewChild('magicNav') magicChild?: MagicNavComponent;
  
  favorites: any[] = [];
  public title = 'My Products';
  currentStep: 'favorites' | 'formulations' | 'storage' = 'favorites';
  private pestData: PestData = { id: 0, name: '' };
  private id:number = 0;
  private navService = inject(NavService);
  currentStepInternal: TabType = "favorites"; 
   
  constructor(
    private favService: FavoritesService, 
    private router: Router,
    private navegateService: NavegateService,
  private cdr: ChangeDetectorRef) { 
    this.getData();
  }


ngAfterViewInit(): void {
  if (!this.magicChild) return;
  if (this.pestData.name === 'formulations' || this.pestData.name === 'storage') {
    this.magicChild.currentStep = this.currentStepInternal;
    this.cdr.detectChanges();
  }
}
  

// ngAfterViewInit(): void {
//   if (!this.magicChild) return;
//   if (this.pestData.name === "formulations" || this.pestData.name === "storage") {
//     this.magicChild.currentStep = this.currentStepInternal;
//   }
// }


  ngOnInit(): void {
    this.favorites = this.favService.getFavorites();
  }

 goToDetail(id: number): void {
      this.navegateService.goToDetail('app/product',id, 'favorites');
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }


  getData() {
      this.pestData = this.navegateService.getData(this.router);
      this.id = this.pestData.id;
      this.checkCcurrentStep(this.pestData.name);
      this.setNav(); 

  if(this.pestData.name === "formulations" || this.pestData.name === "storage"){
         this.currentStepInternal = this.pestData.name;
         let intcurrentStep: 'favorites' | 'formulations' | 'storage' = 'favorites';
         intcurrentStep = this.pestData.name;
          this.setStep(intcurrentStep);
      }

  }


  checkCcurrentStep(nameToNavegate : string): void {
    if (nameToNavegate != '') {
      this.currentStep = nameToNavegate === 'storage' ? 'storage' : nameToNavegate === 'formulations' ? 'formulations' : 'favorites';
    } else {
      this.currentStep = 'favorites';
    }
      this.setStep(this.currentStep);
  }

 

setStep(step: 'favorites' | 'formulations' | 'storage') {
  this.currentStep = step;
  switch (step) {
    case 'favorites':
      this.title = 'My Products';
      this.navService.updateTitle(this.title);
      break;
    case 'formulations':
      this.title = 'Formulations';
      this.navService.updateTitle(this.title);
      break;
    case 'storage':
      this.title = 'Storage';
      this.navService.updateTitle(this.title);
      break;
  }
}
   

  setNav() {
    this.navService.reSetNavConfig();

    let navConfig: NavConfig = new NavConfig();
    navConfig.title = 'My Products';
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