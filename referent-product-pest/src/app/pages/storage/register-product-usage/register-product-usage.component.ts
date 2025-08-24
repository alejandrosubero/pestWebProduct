import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, IUsageRecord } from '../../../models/interfaces';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ProductStoreService } from '../../../services/product-store.service';
import { NavegateService } from '../../../services/navegate.service';


@Component({
  selector: 'app-register-product-usage',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  templateUrl: './register-product-usage.component.html',
  styleUrl: './register-product-usage.component.scss'
})


export class RegisterProductUsageComponent implements OnInit {

  private store = inject(ProductStoreService);
  private navegateService = inject( NavegateService);

  @Output() saveRecord = new EventEmitter<IUsageRecord>();
  @Output() cancelForm = new EventEmitter<void>();
  protected myProducts: IProduct[] =[];
  protected searchQuery:string ='';

  protected searchProduct : IProduct | undefined = {
  name: '',
  type: 'Liquid',
  description: '',
  safetyDataSheetUrl: '',
  package: {
    productId: undefined, 
    locationId: '',
    initialQuantity: 0,
    currentQuantity: 0,
    unitOfMeasure: '',
    status: 'In Stock', 
    batchNumber: '',
    openedDate: '',
    expirationDate: '',
    location: {
      locationName: '',
      locationArea: '',
      locationSeccion: '',
    },
  },
};
usageForm!: FormGroup;

// usage: IUsageRecord = {
//   packageId: '',
//   productId: '',
//   quantityUsed: 0,
//   unitOfMeasure: '',
//   usageDate: new Date().toISOString(),
//   productName: ''
// };

 



  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
     this.myProducts = this.products;
  }

  ngOnInit(): void {
   this.setForm();
     this.usageForm.get('productName')?.valueChanges.subscribe((value: number) => {
        // console.log('change the product: ', value);
        this.searchProduct = this.store.findById(value);
        if(this.searchProduct != undefined && this.searchProduct != null){
           this.updateFormWithProductData(this.searchProduct);
        }
    });
  }

setForm(){
     this.usageForm = this.fb.group({
      productName: ['', Validators.required],
      packageId: [''],
      productId: [''],
      quantityUsed: [
        '',
        [Validators.required, Validators.min(0.01), Validators.pattern(/^\d*\.?\d+$/)],
      ], 
      currentQuantity:[''],
      unitOfMeasure: [''],
      usageDate: [new Date(), Validators.required],
      notes: [''],
    });
 
  }


   updateFormWithProductData(product: IProduct): void {
    this.usageForm.patchValue({
      packageId: product.package.id || '',
      productId: product.package.productId,
      unitOfMeasure: product.package.unitOfMeasure,
      currentQuantity : product.package.currentQuantity || ''
    });
  }




  onSave(): void {

    if (this.usageForm.valid) {
      const record: IUsageRecord = {
        ...this.usageForm.value,
        usageDate: this.usageForm.value.usageDate.toISOString().split('T')[0],
      };
      this.store.applyUsage(record);
      this.onBackClick();
      // this.saveRecord.emit(record);
      this.snackBar.open('Usage record saved!', 'Close', { duration: 2000 });
    } else {
      this.usageForm.markAllAsTouched();
      this.snackBar.open('Please correct the form errors.', 'Close', {
        duration: 3000,
      });
    }
  }

 
 get products() {
    return this.store.products();
  }

  onBackClick(): void {
    this.navegateService.goFavorites('storage', 1);
  }

}


