
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IUsageRecord, PackageSummary, Notification } from '../../../models/interfaces';
import { ProductStoreService } from '../../../services/product-store.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  
  public packageSummary: PackageSummary = { inUse: 0, inStock: 0, empty: 0 };
  public recentUsages: IUsageRecord[] = [];
  public notifications: Notification[] = [];
  private store = inject(ProductStoreService);
  private router = inject(Router);
  // private navegateService = inject(NavegateService);


  ngOnInit(): void {}

  get summary() {
    return this.store.getPackageSummary();
  }

  get record() {
    return this.store.usageRecordStoreService.record();
  }
 
  onRegisterUsage(): void {
    // console.log('Navigate to Register Usage screen');
    this.router.navigate(['/storage/products/register/use']);
  }


  onAddNewProduct(): void {
    this.router.navigate(['/storage/products/add']);
  }


  goToStorageList(): void {
    this.router.navigate(['/storage/products']);
  }


}
