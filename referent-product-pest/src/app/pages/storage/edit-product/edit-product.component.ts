import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { AddProductComponent } from '../add-product/add-product.component';
import { IProduct } from '../../../models/interfaces';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NavConfig } from '../../../models/navElemet.model';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatAutocompleteModule,
    MatInputModule, 
    MatButtonModule, 
    MatIconModule, 
    MatSelectModule, 
    MatToolbarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent extends AddProductComponent implements OnInit {

   protected product: IProduct | undefined;
    
  override ngOnInit() {
   this.setNav();
    this.setList();
    this.product = this.store.findById(this.id);

    if (this.product != undefined) {
      this.form.patchValue({
        name: this.product.name,
        type: this.product.type,
        description: this.product.description,
        safetyDataSheetUrl: this.product.safetyDataSheetUrl,
        initialQuantity: this.product.package.initialQuantity,
        unitOfMeasure: this.product.package.unitOfMeasure,
        status: this.product.package.status,
        locationName: this.product.package.location.locationName,
        locationArea: this.product.package.location.locationArea,
        locationSeccion: this.product.package.location.locationSeccion
      });
    }
    this.updateUnit();
    this.controlFN();
    this.form.get('name')?.valueChanges.subscribe(value => {
      this.nameValue = value;
    });
  }
  
  updateUnit(){
     this.form.get('type')?.valueChanges.subscribe((type: string) => {
      this.updateUnits(type);
    });
    this.updateUnits(this.form.get('type')?.value);
  }

  update() {
    const formValue = this.form.value;
    const productUpdate = {
      id: this.product?.id,
      name: formValue.name,
      type: formValue.type,
      description: formValue.description,
      safetyDataSheetUrl: formValue.safetyDataSheetUrl,
      package: {
        id: this.product?.package.id,
        productId: this.product?.package.productId,
        locationId: formValue.locationId,
        initialQuantity: formValue.initialQuantity,
        currentQuantity: formValue.initialQuantity,
        unitOfMeasure: formValue.unitOfMeasure,
        status: formValue.status,
        location: {
          locationName: formValue.locationName,
          locationArea: formValue.locationArea,
          locationSeccion: formValue.locationSeccion,
        },
      },
    };

    if (productUpdate != undefined) {
      this.store.update(productUpdate);
      this.goBack();
    }
  }

   override goBack() {
          this.navegateService.goToDetail('app/storage/products/detail', this.id, '');
  }

   override setNav():void{
              this.navService.reSetNavConfig();
        
              let navConfig: NavConfig = new NavConfig();
              navConfig.title = "Edit Product";
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
