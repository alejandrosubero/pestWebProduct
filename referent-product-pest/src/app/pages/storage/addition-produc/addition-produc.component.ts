import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit } from '@angular/core';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { NavConfig } from '../../../models/navElemet.model';
import { NavService } from '../../../services/nav.service';
import { IProduct } from '../../../models/interfaces';



@Component({
  selector: 'app-addition-produc',
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
  templateUrl: './addition-produc.component.html',
  styleUrl: './addition-produc.component.scss'
})
export class AdditionProducComponent implements OnInit {


  productTypes = PRODUCT_TYPES;
  status = PACKAGE_STATUS;
  units: (LiquidUnit | DryUnit | CountUnit)[] = [];

  public form!: FormGroup;
  protected fb = inject(FormBuilder);
  protected store = inject(ProductStoreService);
  protected navegateService = inject(NavegateService);
  protected unitService = inject(DefaultUnitServiceService);
  protected productService = inject(ProductService);
  protected navService = inject(NavService);

  protected pestData: PestData = { id: 0, name: '' };
  protected id: number = 0;
  protected nameToNavegate = '';

  protected allProducts: IProduct[] = [];
  protected options: string[] = [];
  protected filteredOptions!: Observable<string[]>;
  protected nameValue: string = '';

  private isTheProduct: IProduct | undefined;

  constructor(public router: Router,) {
    this.setForm();
    this.setNav();
  }

  ngOnInit(): void {
    this.setList();
    this.controlFN();
    this.form.get('name')?.valueChanges.subscribe(value => {
      this.nameValue = value;
      if (this.nameValue) {
        this.isTheProduct = this.getProductByName(this.nameValue);
      }
    });
    this.getData();
  }


  setForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, Validators.required],
    });
  }


  setNav() {
    this.navService.reSetNavConfig();
    let navConfig: NavConfig = new NavConfig();
    navConfig.title = "Add Product";
    navConfig.ico.menu = false;
    navConfig.ico.back = true;
    navConfig.ico.favorite = false;
    navConfig.ico.logut = false;
    navConfig.ico.label = false;
    navConfig.ico.sds = false;
    navConfig.goto = 'app/storage/products';
    this.navService.setNavConfig(navConfig);
  }

  clearInput(): void {
    this.form.get("name")?.setValue('');
  }

  checkValue(): boolean {
    return this.nameValue === '' ? false : true;
  }


  products() {
    const produtsList = this.store.filteredProducts();
    const sortedProducts = produtsList.sort((a, b) => a.name.localeCompare(b.name));
    return sortedProducts;
  }


  setList() {
    this.allProducts = this.products();
    if (this.allProducts != undefined && this.allProducts != null && this.allProducts.length > 0) {
      this.options = this.getProductNames(this.allProducts);
    }
  }

  getProductNames(products: IProduct[]): string[] {
    return products.map(product => product.name);
  }


  getProductByName(name: string): IProduct | undefined {
    return this.allProducts.find(productI => productI.name === name);
  }


  controlFN() {
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


  save() {
    const formValue = this.form.value;

    if (this.isTheProduct === undefined || this.isTheProduct === null) {
      this.isTheProduct = this.getProductByName(formValue.name);
    }

    if (this.isTheProduct && this.isTheProduct.package) {
      
      if (this.isTheProduct.package.additions === undefined || this.isTheProduct.package.additions === null) {
        this.isTheProduct.package.additions = [];
        const addition = { quantity: this.isTheProduct.package.initialQuantity, addDate: new Date() };
        this.isTheProduct.package.additions.push(addition);
      }

      let newQuantity: number = this.isTheProduct.package.currentQuantity + formValue.quantity;
      this.isTheProduct.package.initialQuantity = newQuantity;
      this.isTheProduct.package.currentQuantity = newQuantity;

  
      const addition = { quantity: formValue.quantity, addDate: new Date() };
      this.isTheProduct.package.additions.push(addition);
      this.store.update(this.isTheProduct);
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['app/storage/products']);
  }


  getData() {
    this.pestData = this.navegateService.getData(this.router);
    if (this.pestData != undefined && this.pestData != null) {
      this.id = this.pestData.id;
      this.nameToNavegate = this.pestData.name

      if (this.id !== undefined && this.id !== null) {
        this.workWithData();
      }

    }
  }

  workWithData() {
    const product: IProduct | undefined = this.store.findById(this.id);
    if (product != undefined) {
      this.form.patchValue({
        name: product.name,
      });
      this.isTheProduct = product;
    }
  }




}
