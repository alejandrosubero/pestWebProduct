
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


@Component({
  selector: 'app-product-detail',
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

    MatListModule,],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
isFav = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private favService: FavoritesService,
    private productService : ProductService
  ) {}

    private configUrl: string = 'assets/config/products.json';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const prolist = this.productService.products(); 
     if(prolist != undefined && prolist != null && prolist.length > 0){
      this.checkProduct(prolist, id);
     }
    // this.http.get<any[]>(this.configUrl).subscribe(data => {
    //   this.product = data.find(p => p.id === id);
    //   if (!this.product) {
    //     this.router.navigate(['/home']);
    //   }
    // });
     this.isFav = this.favService.isFavorite(this.product.id);
  }

  back(): void {
    this.router.navigate(['/home']);
  }

toggleFavorite(): void {
  if (this.isFav) {
    this.favService.removeFromFavorites(this.product.id);
  } else {
    this.favService.addToFavorites(this.product);
  }
  this.isFav = !this.isFav;
}

checkProduct(prolist : Product[], id: number){
   this.product = prolist.find(p => p.id === id);
    if (!this.product) {
        this.router.navigate(['/home']);
      }
}


}


