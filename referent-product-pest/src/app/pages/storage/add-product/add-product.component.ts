import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductStoreService } from '../../../services/product-store.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { NavegateService } from '../../../services/navegate.service';
import { CountUnit, DryUnit, LiquidUnit, PACKAGE_STATUS, PRODUCT_TYPES, ProductType } from '../../../models/const.model';
import { DefaultUnitServiceService } from '../../../services/default-unit-service.service';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { PestData } from '../../../models/pestdata.model';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';



@Component({
  selector: 'app-add-product',
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
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  
 productTypes = PRODUCT_TYPES;
 status = PACKAGE_STATUS;
  units: (LiquidUnit | DryUnit | CountUnit)[] = [];

  public form!: FormGroup;
  protected fb = inject(FormBuilder);
  protected store = inject(ProductStoreService);
  protected navegateService = inject(NavegateService);
  protected unitService = inject(DefaultUnitServiceService);
  protected productService = inject(ProductService);

  protected pestData: PestData = { id: 0, name: '' };
  protected id: number = 0;
  protected nameToNavegate = '';

  protected allProducts: Product[] = [];
  protected options: string[] = []; 
  protected filteredOptions!: Observable<string[]>;
  protected nameValue: string ='';

  constructor(public router: Router,) {
   this.setForm();
   this. getData();
   
  }
 

  ngOnInit(): void {
    this.setList();
    this.form.get('type')?.valueChanges.subscribe((type: string) => {
      this.updateUnits(type);
    });
    this.updateUnits(this.form.get('type')?.value);
    this.controlFN();
     this.form.get('name')?.valueChanges.subscribe(value => {
        this.nameValue = value;
    });
  }


  save() {
    const formValue = this.form.value;
    const product = {
      name: formValue.name,
      type: formValue.type,
      description: formValue.description,
      safetyDataSheetUrl: formValue.safetyDataSheetUrl,
      package: {
        productId: 'TEMP-ID',
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
    this.store.save(product);
    this.goBack();
  }

  goBack() {
        this.router.navigate(['/storage/products']);
  }


  protected updateUnits(type: string): void {
    if (type != undefined && type != null) {
      this.units = this.unitService.getUnitsByProductType(type);
      if (this.units.length > 0) {
        this.form.get('unitOfMeasure')?.setValue(this.units[0]);
      } else {
        this.form.get('unitOfMeasure')?.setValue(null);
      }
    }
  }

  setForm(){
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['',Validators.required],
      description: [''],
      safetyDataSheetUrl: [''],
      locationId: [''],
      initialQuantity: [0, Validators.required],
      unitOfMeasure: [''],
      status: [this.status[0]],
      locationName: [''],
      locationArea: [''],
      locationSeccion: [''],
    });
  }


  getData() {
    this.pestData = this.navegateService.getData(this.router);
    if (this.pestData != undefined && this.pestData != null) {
      this.id = this.pestData.id;
      this.nameToNavegate = this.pestData.name
    }
  }

getProductNames(products: Product[]): string[] {
  return products.map(product => product.name);
}

setList(){
  this.allProducts = this.productService.products(); 
  if(this.allProducts != undefined && this.allProducts != null && this.allProducts.length > 0){
       this.options = this.getProductNames(this.allProducts);
  }
}

 
  controlFN(){
  
    if (!this.form) {
      console.error('AutocompleteInputComponent: error FormGroup.');
      return; 
    }

      const control = this.form.get("name");
    if (!control) {
      console.error(`AutocompleteInputComponent: error in '${"name"}' no find FormGroup.`);
      return;
    }

    this.filteredOptions = control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

 
  clearInput(): void {
    this.form.get("name")?.setValue('');
  }

  checkValue(): boolean {
    return this.nameValue === ''? false : true;
  }



}
