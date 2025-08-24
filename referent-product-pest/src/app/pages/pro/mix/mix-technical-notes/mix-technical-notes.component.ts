import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavegateService } from '../../../../services/navegate.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MixProductTechNoteService } from '../../../../services/mix-product-tech-note.service';
import { Analysis, MixProducTechNote } from '../../../../models/MixProducTechNote.model';

import { TechnicalProduct } from '../../../../models/technical_product.model';
import { TechnicalProductService } from '../../../../services/TechnicalProductService';


@Component({
  selector: 'app-mix-technical-notes',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatToolbarModule
  ],
  templateUrl: './mix-technical-notes.component.html',
  styleUrl: './mix-technical-notes.component.scss'
})
export class MixTechnicalNotesComponent {

  private mixProductTechNoteService = inject(MixProductTechNoteService);
  public title: string = 'Mix Product Analysis';
  public elementFather: string | null | undefined= '';
  
  mixNotes: MixProducTechNote[] = [];
  selectedProduct: MixProducTechNote | null = null;
  selectedAnalysis: Analysis | null = null;
  
  constructor(
    private navegateService: NavegateService,
    private router: Router
  ) {
    this.getData();
  }


  getData() {
    this.mixProductTechNoteService.getMixProductTechNotes()
      .subscribe(mix => {
        this.mixNotes = mix;
        // console.log('Datos cargados:', this.mixNotes);
      });
  }

 onProductChange(productId: number): void {
    this.selectedProduct = this.mixNotes.find(p => p.product_id === productId) || null;
    this.selectedAnalysis = null; // reset analysis when product changes
    this.elementFather = this.selectedProduct?.product_title;
  }

  onAnalysisChange(withProductId: number): void {
    if (this.selectedProduct) {
      this.selectedAnalysis = this.selectedProduct.analyses.find(a => a.with_product_id === withProductId) || null;
    }
  }


  back(): void {
    this.router.navigate(['/home']);
  }

  goToDetail(id: number): void {
    const routeBase = "technical/notes";
    this.navegateService.goToDetail(routeBase, id, routeBase);
  }

  
}
