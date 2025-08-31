
import { Component, inject, OnInit ,  ElementRef, ViewChild } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormGroup, FormsModule , ReactiveFormsModule, FormControl, Validators, FormBuilder} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormulationService } from '../../services/formulation.service';
import { Formulation } from '../../models/formulation.model';
import { NavegateService } from '../../services/navegate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DBService } from '../../services/db.service';
import { DefaultUnitServiceService } from '../../services/default-unit-service.service';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { NavConfig } from '../../models/navElemet.model';
import { NavService } from '../../services/nav.service';


@Component({
  selector: 'app-formulation-add',
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
      ReactiveFormsModule,
      MatFormFieldModule 
    ],
  templateUrl: './formulation-add.component.html',
  styleUrls: ['./formulation-add.component.scss']
})
export class FormulationAddComponent implements OnInit {

  @ViewChild('textarea') textareaRef!: ElementRef<HTMLTextAreaElement>;
  title = '';
  content = '';
  form!: FormGroup;
  formulation : Formulation = { id: 0, title: '', content: ''}
  text: string = '';
  suggestion: string = '';
  protected allProducts: Product[] = [];
  private fb = inject(FormBuilder);
  private navegateService = inject( NavegateService);
  private db = inject(DBService);
  private navService = inject(NavService);
  private unitService = inject(DefaultUnitServiceService);
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private id:number = 0;
  private PRODUCTS: string[] = [];
  private UNITS: string[] = [];
  private ALL_SUGGESTIONS: string[] = [];

  formulationId!: number;

  constructor(private service: FormulationService, private router: Router) {
   this.updateUnits('Liquid');
   this.setNav();
  }


 ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.formulation.title, Validators.required],
      content: [this.formulation.content, Validators.required]
    });
  }


  updateUnits(type: string): void {
    if (type != undefined && type != null) {
      this.UNITS = this.unitService.getUnitsByProductType(type);
      this.PRODUCTS = this.getProductNames();
      if (this.UNITS.length > 0) {
        this.ALL_SUGGESTIONS = [...new Set([...this.PRODUCTS, ...this.UNITS])].sort();
      } else {
        this.UNITS = ['oz', 'fl oz', 'gal', 'L', 'mL', 'g', 'kg', 'lb', 'ft', 'm', 'sq ft','sq m'];
      }
    }
  }


  getProductNames(): string[] {
    const products: Product[] = this.productService.products();
    let list: string[] = [];
    if (products != undefined && products != null) {
      list = products.map(product => product.name);
    }
    return list;
  }

 
  save(): void {
    const newFormulation: Formulation = {
      id: Date.now(),
      title: this.form.value.title,
      content: this.form.value.content
    };
    // this.service.saveFormulation(newFormulation);
    this.db.addFormulations(newFormulation);
    this.goBack();
  }
  
  cancel(): void {
    this.goBack();
  }

  goBack(): void {
    this.navegateService.goFavorites('formulations', this.id);
  }



  handleInputChange(): void {
    this.form.get('content')?.valueChanges.subscribe((content: string) => {
      this.text = content;
    });

    const lastWordMatch = this.text.match(/(\S+)$/);
    if (lastWordMatch && lastWordMatch[1]) {
      const lastWord = lastWordMatch[1];
      const foundSuggestion = this.ALL_SUGGESTIONS.find(s =>
        s.toLowerCase().startsWith(lastWord.toLowerCase()) && s.toLowerCase() !== lastWord.toLowerCase()
      );
      this.suggestion = foundSuggestion || '';
    } else {
      this.suggestion = '';
    }
  }


  acceptSuggestion(): void {
    if (!this.suggestion) return;
    const lastWordMatch = this.text.match(/(\S+)$/);
    let newText: string;

    if (lastWordMatch) {
      const lastWord = lastWordMatch[1];
      const baseText = this.text.substring(0, this.text.length - lastWord.length);
      newText = baseText + this.suggestion + ' ';
    } else {
      newText = this.text + this.suggestion + ' ';
    }

    this.text = newText;
    this.form.get('content')?.setValue(this.text);
    this.suggestion = '';
    setTimeout(() => this.textareaRef.nativeElement.focus(), 0);
  }

  handleKeyDown(event: KeyboardEvent): void {
    if ((event.key === 'Tab' || event.key === 'Enter') && this.suggestion) {
      event.preventDefault(); 
      this.acceptSuggestion();
    }
  }



  setNav() {
          this.navService.reSetNavConfig();
    
          let navConfig: NavConfig = new NavConfig();
          navConfig.title = "Add Formulation";
          navConfig.ico.menu = false;
          navConfig.ico.back = true;
          navConfig.ico.favorite = false;
          navConfig.ico.logut = false;
          navConfig.ico.label = false;
          navConfig.ico.sds = false;      
          
          navConfig.favorite.url = 'formulations';
          if(this.id){
            navConfig.favorite.id = this.id;
          }
          navConfig.goto = 'formulations';
          this.navService.setNavConfig(navConfig);
        }

        
}

