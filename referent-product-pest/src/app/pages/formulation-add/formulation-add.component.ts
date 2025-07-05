
import { Component, inject, OnInit } from '@angular/core';
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
export class FormulationAddComponent {
  title = '';
  content = '';
  form!: FormGroup;
  formulation : Formulation = { id: 0, title: '', content: ''}

  private fb = inject(FormBuilder);
  private navegateService = inject( NavegateService);
  private id:number = 0;
  private db = inject(DBService);
  
  constructor(private service: FormulationService, private router: Router) {}

 ngOnInit(): void {
  
    this.form = this.fb.group({
      title: [this.formulation.title, Validators.required],
      content: [this.formulation.content, Validators.required]
    });
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

   goBack(): void {
      this.navegateService.goFavorites('formulations', this.id);
  }

  cancel(): void {
     this.goBack();
  }
}

