
import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';

import { FavoritesService } from '../../services/favorites.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { PestData } from '../../models/pestdata.model';
import { AuthService } from '../../services/auth.service';



import { FormulationService } from '../../services/formulation.service';
import { Formulation } from '../../models/formulation.model';

@Component({
   selector: 'app-formulations-list',
  standalone: true,
    imports: [
      CommonModule,
      HttpClientModule,
      FormsModule,
      MatToolbarModule,
      MatButtonModule,
      MatInputModule,
      MatIconModule,
      MatCardModule,
      MatSidenavModule,
      MatListModule,
    ],
  templateUrl: './formulations-list.component.html',
  styleUrl: './formulations-list.component.scss'
})
export class FormulationsListComponent {
  formulations: Formulation[] = [];

  constructor(private service: FormulationService, private router: Router) {}

  ngOnInit(): void {
    this.formulations = this.service.getFormulations();
  }

  goToDetail(id: number): void {
    this.router.navigate(['/formulation', id]);
  }

  addNew(): void {
    this.router.navigate(['/formulation/add']);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

}
