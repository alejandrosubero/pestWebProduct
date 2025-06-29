
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formulationService = inject(FormulationService);
  private fb = inject(FormBuilder);

  form!: FormGroup;
  formulationId!: number;

  ngOnInit(): void {
    this.formulationId = Number(this.route.snapshot.paramMap.get('id'));
    const formulation = this.formulationService.getFormulationById(this.formulationId);

    if (!formulation) {
      this.router.navigate(['/formulations']);
      return;
    }

    this.form = this.fb.group({
      title: [formulation.title, Validators.required],
      content: [formulation.content, Validators.required]
    });
  }

  save(): void {
    const updated: Formulation = {
      id: this.formulationId,
      title: this.form.value.title,
      content: this.form.value.content
    };
    this.formulationService.updateFormulation(updated);
    this.router.navigate(['/formulations']);
  }

  cancel(): void {
    this.router.navigate(['/formulations']);
  }
}
