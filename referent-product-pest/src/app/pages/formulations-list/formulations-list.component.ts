
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
import { Router } from '@angular/router';
import { FormulationService } from '../../services/formulation.service';
import { Formulation } from '../../models/formulation.model';
import { NavegateService } from '../../services/navegate.service';
import { DBService } from '../../services/db.service';

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
  private db = inject(DBService);
  
  constructor(
    private service: FormulationService, 
    private router: Router,
    private navegateService: NavegateService) {}

  ngOnInit(): void {
    // this.formulations = this.service.getFormulations();
    this.db.getAllFormulations().then(data => {
        const sortedProducts  = data.sort((a, b) => a.title.localeCompare(b.title));
      this.formulations = sortedProducts;
    });


  }

 goToDetail(id: number): void {
      this.navegateService.goToDetail('formulation',id, 'formulations');
  }

  addNew(): void {
    this.router.navigate(['/formulation/add']);
  }

  
}
