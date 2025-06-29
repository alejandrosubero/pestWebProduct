
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormulationService } from '../../services/formulation.service';
import { Formulation } from '../../models/formulation.model';
import { MatDialog } from '@angular/material/dialog';


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
import { MatDialogModule } from '@angular/material/dialog';


import { FavoritesService } from '../../services/favorites.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { PestData } from '../../models/pestdata.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-formulation-detail',
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
      MatDialogModule,
    ],
  templateUrl: './formulation-detail.component.html',
  styleUrl: './formulation-detail.component.scss'
})




export class FormulationDetailComponent implements OnInit{
  // formulation?: Formulation;
 formulation!: Formulation | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: FormulationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  // ngOnInit(): void {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.formulation = this.service.getFormulationById(id);
  // }

  edit(): void {
    this.router.navigate(['/formulation/edit', this.formulation?.id]);
  }

  confirmDelete(): void {
    const confirm = window.confirm('Are you sure you want to delete this formulation?');
    if (confirm && this.formulation) {
      this.service.deleteFormulation(this.formulation.id);
      this.router.navigate(['/formulations']);
    }
  }


  // goBack(): void {
  //   this.router.navigate(['/formulations']);
  // }
   
 
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.formulation = this.service.getFormulationById(id);

    if (!this.formulation) {
      this.router.navigate(['/formulations']);
    }
  }



  delete(): void {
    if (this.formulation && confirm('Are you sure you want to delete this formulation?')) {
      this.service.deleteFormulation(this.formulation.id);
      this.router.navigate(['/formulations']);
    }
  }

  goBack(): void {
    this.router.navigate(['/formulations']);
  }
}

