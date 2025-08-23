
// 📁 src/app/pages/formulation-edit/formulation-edit.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormulationService } from '../../services/formulation.service';
import { Formulation } from '../../models/formulation.model';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavegateService } from '../../services/navegate.service';
import { DBService } from '../../services/db.service';

@Component({
  selector: 'app-formulation-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule

  ],
  templateUrl: './formulation-edit.component.html',
  styleUrls: ['./formulation-edit.component.scss']
})

export class FormulationEditComponent implements OnInit {

  private db = inject(DBService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formulationService = inject(FormulationService);
  private fb = inject(FormBuilder);
  private navegateService = inject( NavegateService);
  private id:number = 0;
  formulation: Formulation = { id: 1, title:'', content:''};

  form!: FormGroup;
  formulationId!: number;

  ngOnInit(): void {
    let formulation: Formulation | undefined;
    this.formulationId = Number(this.route.snapshot.paramMap.get('id'));
    // const formulation = this.formulationService.getFormulationById(this.formulationId);
    
    this.db.getFormulationsById(this.formulationId).then(data => {
      formulation = data;
      if (formulation != undefined && formulation != null) {
        this.form = this.fb.group({
          title: [formulation.title, Validators.required],
          content: [formulation.content, Validators.required]
        });
      }
    });
  }

  save(): void {
    const updated: Formulation = {
      id: this.formulationId,
      title: this.form.value.title,
      content: this.form.value.content
    };
     this.db.updateFormulations(updated);
    // this.formulationService.updateFormulation(updated);
     this.goBack();
  }

  cancel(): void {
    this.goBack();
  }

    goBack(): void {
      this.navegateService.goFavorites('formulations', this.id);
  }
}
