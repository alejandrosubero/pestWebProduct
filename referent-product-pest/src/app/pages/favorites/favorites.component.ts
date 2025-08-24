import { Component, inject, OnInit } from '@angular/core';
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
    MatListModule, DashboardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {

  favorites: any[] = [];
  public title = 'My Products';
  currentStep: 'favorites' | 'formulations' | 'storage' = 'favorites';
  private pestData: PestData = { id: 0, name: '' };
  private id:number = 0;
 
   
  constructor(
    private favService: FavoritesService, 
    private router: Router,
    private navegateService: NavegateService) { 
    this.getData();
  }

  ngOnInit(): void {
    // const favorites = this.favService.getFavorites();
      // const sortedFavirites  = favorites.sort((a, b) => a.title.localeCompare(b.title));
    this.favorites = this.favService.getFavorites();
    // this.favorites =sortedFavirites;
  }

 goToDetail(id: number): void {
      this.navegateService.goToDetail('product',id, 'favorites');
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }


  getData() {
      this.pestData = this.navegateService.getData(this.router);
      this.id = this.pestData.id;
      this.checkCcurrentStep(this.pestData.name);
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
      break;
    case 'formulations':
      this.title = 'Formulations';
      break;
    case 'storage':
      this.title = 'Storage';
      break;
  }
}


}