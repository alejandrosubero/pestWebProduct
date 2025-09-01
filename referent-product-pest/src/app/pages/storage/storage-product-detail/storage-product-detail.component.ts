
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductStoreService } from '../../../services/product-store.service';
import { PestData } from '../../../models/pestdata.model';
import { Router } from '@angular/router';
import { NavegateService } from '../../../services/navegate.service';
import { ProductType } from '../../../models/interfaces';
import { NavService } from '../../../services/nav.service';
import { NavConfig } from '../../../models/navElemet.model';


@Component({
  selector: 'app-storage-product-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './storage-product-detail.component.html',
  styleUrl: './storage-product-detail.component.scss'
})
export class StorageProductDetailComponent {

  isFabOpen = false;
  private store = inject(ProductStoreService);
  private navService = inject(NavService);
  private pestData: PestData = { id: 0, name: '' };
  private id: number = 0;
  private nameToNavegate = '';

  constructor(
    private router: Router,
    private navegateService: NavegateService) {
    this.getData();
    this.setNav();
  }

 toggleFab() {
    this.isFabOpen = !this.isFabOpen;
  }

  getData() {
    this.pestData = this.navegateService.getData(this.router);
    this.id = this.pestData.id;
    this.nameToNavegate = this.pestData.name
  }


  get product() {
    return this.store.findById(this.id);
  }

   onEdit() {
    if (this.id !== undefined) {
      this.navegateService.goToDetail('app/storage/products/edit', this.id, '');
    } else {
      console.warn('Attempting to browse in detail with an undefined ID.');
    }
  }


  onDelete() {
    if (this.id !== undefined) {
      this.store.delete(this.id);
      this.goBack();
    }
  }

    goBack() {
    this.router.navigate(['app/storage/products']);
  }
  

// Helper for dynamic icons based on product type
  getProductIcon2(type: ProductType): string {
    switch (type) {
      case 'Liquid': return 'water_drop';
      case 'Granular': return 'grain';
      case 'Dust': return 'powder_settings';
      case 'Gel': return 'bubble_chart'; // Or 'gel_outlined' if you find a similar icon
      case 'Aerosol': return 'air';
      case 'Solid': return 'block'; // Or 'cube', 'square_foot'
      case 'Bait': return 'bug_report'; // Or 'mouse'
      default: return 'inventory_2'; // Default box icon
    }

  }

getProductIcon(type: ProductType): string {
  switch (type) {
    case 'Liquid':
      return 'water_drop'; // Remains good - clear liquid representation
    case 'Granular':
      return 'grain'; // Still quite good for small particles/granules
    case 'Dust':
      return 'cloud'; // Represents fine particles in the air, or 'sprinkler_gaps' for dispersion
    case 'Gel':
      return 'bubble_chart'; // Suggests a viscous, spreadable substance
    case 'Aerosol':
      return 'spray_can'; // Direct and recognizable for a spray can
    case 'Solid':
      return 'inventory_2'; // Represents a general solid item or package
    case 'Bait':
      return 'pest_control'; // More direct for general pest control bait
    default:
      return 'category'; // A more generic "category" or "product" icon
  }
}


 setNav():void{
            this.navService.reSetNavConfig();
      
            let navConfig: NavConfig = new NavConfig();
            navConfig.title = "Product Details";
            navConfig.ico.menu = false;
            navConfig.ico.back = true;
            navConfig.ico.favorite = false;
            navConfig.ico.logut = false;
            navConfig.ico.label = false;
            navConfig.ico.sds = false;      
            
            navConfig.goto = 'app/storage/products';
            this.navService.setNavConfig(navConfig);
          }




}