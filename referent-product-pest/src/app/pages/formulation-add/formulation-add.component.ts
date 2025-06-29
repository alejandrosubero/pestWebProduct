
import { Component, OnInit } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
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
  selector: 'app-formulation-add',
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
  templateUrl: './formulation-add.component.html',
  styleUrls: ['./formulation-add.component.scss']
})
export class FormulationAddComponent {
  title = '';
  content = '';

  constructor(private service: FormulationService, private router: Router) {}

  save(): void {
    const newFormulation: Formulation = {
      id: Date.now(),
      title: this.title,
      content: this.content
    };
    this.service.saveFormulation(newFormulation);
    this.router.navigate(['/formulations']);
  }

  cancel(): void {
    this.router.navigate(['/formulations']);
  }
}

