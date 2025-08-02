
import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
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
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { PestData } from '../../models/pestdata.model';
import { NavegateService } from '../../services/navegate.service';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
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
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  isFav = false;
  pestData: PestData = { id: 0, name: '' };
  id:number = 0;
  private configUrl: string = 'assets/config/products.json';
  private nameToNavegate ='';


 oneProduct: Product  = {
    id: 0,
    name: '',
    activeIngredients:'',
    applicationTreatment:'',
    pestsControlled: [],
    url1: '',
    url2: ''
 }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private favService: FavoritesService,
    private productService: ProductService,
    private navegateService: NavegateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { 
    this.matIconRegistry.addSvgIcon( 'sds', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/sds.svg') );
    this.matIconRegistry.addSvgIcon( 'label', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/label.svg') );
    this.getData();
  }

 
  getData() {
    const nav = this.router.getCurrentNavigation();
    this.pestData = nav?.extras?.state?.['data'] ||
      history.state.data || null;
    
      if (!this.pestData) {
      console.warn('No pestData passed, fetching by ID or redirecting...');
    }else{
      this.id = this.pestData.id;
      this.nameToNavegate = this.pestData.name != undefined && this.pestData.name != null? this.pestData.name : '';
    }
  }

  ngOnInit(): void {
    const prolist = this.productService.products();
    if (prolist != undefined && prolist != null && prolist.length > 0) {
      this.checkProduct(prolist, this.id);
    }
  }

  checkProduct(prolist: Product[], id: number) {

    const found = prolist.find(p => p.id === id);
    if (found) {
       this.product = found;
      this.oneProduct = found;
    } else {
      console.error('Producto no encontrado con id:', id);
    }

    if (!this.product) {
      this.router.navigate(['/home']);
    }else{
    this.isFav = this.favService.isFavorite(this.id);
    }
  }

  back(): void {
    if(this.nameToNavegate === 'favorites'){
     this.goFavorites();
    }else {
      this.router.navigate(['/home']);
    }
  }

  toggleFavorite(): void {
    if (this.isFav) {
      this.favService.removeFromFavorites(this.product.id);
    } else {
      this.favService.addToFavorites(this.product);
    }
    this.isFav = !this.isFav;
  }

  goFavorites(): void {
    this.navegateService.goFavorites('favorites', 1);
  }

    viewPdf(): void {
    window.open( this.oneProduct.url1, '_blank');
  }

    viewSdS(): void {
    window.open( this.oneProduct.url2, '_blank');
  }
  
  downloadPdf(): void {
    const pdfUrl = this.oneProduct.url1;
    const pdfName = `${new Date()}.pdf`;
    // Crea un enlace temporal.
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfName;
    link.click();
    link.remove();
  }

}


