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
import { NavService } from '../../../../services/nav.service';
import { NavConfig } from '../../../../models/navElemet.model';


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
  private navService = inject(NavService);
  public title: string = 'Mix Product Analysis';
  public elementFather: string | null | undefined= '';
  
  mixNotes: MixProducTechNote[] = [];
  selectedProduct: MixProducTechNote | null  = null;
  selectedAnalysis: Analysis | null = null;
  
  constructor(
    private navegateService: NavegateService,
    private router: Router
  ) {
    this.getData();
    this.setNav();
  }


  getData() {
    this.mixProductTechNoteService.getMixProductTechNotes()
      .subscribe(mix => {
        const sorted = [...mix].sort((a, b) =>
          a.product_title.localeCompare(b.product_title)
        );
        this.mixNotes = sorted
        // this.mixNotes = mix;
        // console.log('Datos cargados:', this.mixNotes);
      });
  }

 onProductChange1(productId: number): void {
    this.selectedProduct = this.mixNotes.find(p => p.product_id === productId) || null;
    this.selectedAnalysis = null; // reset analysis when product changes
    this.elementFather = this.selectedProduct?.product_title;
  }

  onProductChange(productId: number): void {

  this.selectedProduct = this.mixNotes.find(p => p.product_id === productId) || null;
  this.selectedAnalysis = null; 
   this.setNav();

  if (this.selectedProduct && this.selectedProduct.analyses && this.selectedProduct.analyses.length > 0) {
    const sorted = [...this.selectedProduct.analyses].sort((a, b) =>
      a.with_product_title.localeCompare(b.with_product_title)
    );
    this.selectedProduct.analyses = sorted;
  }
  this.elementFather = this.selectedProduct?.product_title ?? '';

  this.setNav();
 
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
    const routeBase = "app/technical/notes";
    this.navegateService.goToDetail(routeBase, id, routeBase);
  }

  getAnswerClass(): string {
  const answer = this.selectedAnalysis?.would_it_work?.answer?.toLowerCase();
  if (answer === 'yes') return 'answer-yes';
  if (answer === 'no') return 'answer-no';
  return 'answer-other';
}

  setNav(): void {
    this.navService.reSetNavConfig();

    let navConfig: NavConfig = new NavConfig();
    navConfig.title = this.title;
    navConfig.ico.menu = true;
    navConfig.ico.back = false;
    navConfig.ico.favorite = false;
    navConfig.ico.logut = false;
    navConfig.ico.label = false;
    navConfig.ico.sds = false;

    if (this.selectedProduct) {
      navConfig.ico.source = true;
      navConfig.sourceId = this.selectedProduct.product_id;
    }

    navConfig.goto = 'app/home';
    this.navService.setNavConfig(navConfig);
  }

}
