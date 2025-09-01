import { Component, inject, OnInit } from '@angular/core';
import { TechnicalProduct } from '../../models/technical_product.model';
import { TechnicalProductService } from '../../services/TechnicalProductService';
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

// Importa MatExpansionModule
import { MatExpansionModule } from '@angular/material/expansion'; 
import { ActivatedRoute, Router } from '@angular/router';
import { PestData } from '../../models/pestdata.model';
import { NavegateService } from '../../services/navegate.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavService } from '../../services/nav.service';
import { NavConfig } from '../../models/navElemet.model';


@Component({
  selector: 'app-technical-notes',
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
    MatExpansionModule,
  ],
  templateUrl: './technical-notes.component.html',
  styleUrl: './technical-notes.component.scss'
})
export class TechnicalNotesComponent implements OnInit {

  private nameToNavegate = '';
  private navService = inject(NavService);
  public title: string = 'Technical Note';
  technicalProducts: TechnicalProduct[] = [];
  pestData: PestData = { id: 0, name: '' };
  id: number = 0;
  technicalProduct: TechnicalProduct = new TechnicalProduct();

  constructor(
    private navegateService: NavegateService,
    private technicalProductService: TechnicalProductService,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private router: Router,
  ) {
    this.matIconRegistry.addSvgIcon('sds', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/sds.svg'));
    this.matIconRegistry.addSvgIcon('label', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/label.svg'));
    this.getData();
  }

  ngOnInit(): void {
    this.setNav();
  }

  getData() {
    const nav = this.router.getCurrentNavigation();
    this.pestData = nav?.extras?.state?.['data'] || history.state.data || null;
    if (!this.pestData) {
      console.warn('No pestData passed, fetching by ID or redirecting...');
    } else {

      this.id = this.pestData.id;
      this.nameToNavegate = this.pestData.name != undefined && this.pestData.name != null ? this.pestData.name : '';
      
      if (this.id) {
       this.getProductById(this.id);
       this.checkProduct(this.technicalProduct, this.id);
      } else {
            console.warn('the Id is incorrect or no found...');
      }
    }
    this.setNav();
  }


  checkProduct(prolist: TechnicalProduct, id: number) {
   const route = 'app/home';
   
    if (!prolist) {
      this.router.navigate([route]);
    }

      if (!id) {
      this.router.navigate([route]);
    }
  }

  getAllProducts(): void {
    const products = this.technicalProductService.getAllTechnicalProducts();
  }

  getProductById(id: number): void {
    const product = this.technicalProductService.getTechnicalProductBySourceFile(id);
      if (product) {
        this.technicalProduct = product;
      }
  }

    viewPdf(): void {
    window.open( this.technicalProduct.url1, '_blank');
  }

    viewSdS(): void {
    window.open( this.technicalProduct.url2, '_blank');
  }


 back(): void {
    const routeBase = "app/technical/notes";
    this.router.navigate([routeBase]);
  }


   downloadPdf(): void {
    const pdfUrl = this.technicalProduct.url1;
    const pdfName = `${new Date()}.pdf`;
    // Crea un enlace temporal.
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfName;
    link.click();
    link.remove();
  }

  setNav(): void {
    this.navService.reSetNavConfig();

    let navConfig: NavConfig = new NavConfig();
    navConfig.title = "Technical Note";
    navConfig.ico.menu = false;
    navConfig.ico.back = true;
    navConfig.ico.favorite = false;
    navConfig.ico.logut = false;

    navConfig.ico.label = true;
    navConfig.ico.sds = true;

    if (this.technicalProduct.url1) {
      navConfig.label = this.technicalProduct.url1;
    }
    if (this.technicalProduct.url2) {
      navConfig.sds = this.technicalProduct.url2;
    }
    if (this.pestData.name === 'mix') {
      navConfig.goto = 'app/technical/notes/mix';
    } else {
      navConfig.goto = 'app/technical/notes';
    }
    this.navService.setNavConfig(navConfig);
  }
  
}
