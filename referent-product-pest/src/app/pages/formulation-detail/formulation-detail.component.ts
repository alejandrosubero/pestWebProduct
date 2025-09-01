
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormulationService } from '../../services/formulation.service';
import { Formulation } from '../../models/formulation.model';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../share/confirm-dialog/confirm-dialog.component';
import { PestData } from '../../models/pestdata.model';
import { NavegateService } from '../../services/navegate.service';
import { NgIf } from '@angular/common';
import { DBService } from '../../services/db.service';
import { NavConfig } from '../../models/navElemet.model';
import { NavService } from '../../services/nav.service';
import { TextFieldModule } from '@angular/cdk/text-field';



@Component({
  selector: 'app-formulation-detail',
  standalone: true,
    imports: [
      NgIf,
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
      MatDialogModule,
       TextFieldModule
    ],
  templateUrl: './formulation-detail.component.html',
  styleUrl: './formulation-detail.component.scss'
})

export class FormulationDetailComponent implements OnInit{

  formulation!: Formulation | undefined;
  private pestData: PestData = { id: 0, name: '' };
  private id: number = 0;
  private nameToNavegate = '';
  isFabOpen = false;
  private db = inject(DBService);
  private navService = inject(NavService);

  constructor(
    private route: ActivatedRoute,
    private service: FormulationService,
    private router: Router,
    private dialog: MatDialog,
    private navegateService: NavegateService) {
    this.getData(); 
  }


  ngOnInit(): void {
     this.id = Number(this.route.snapshot.paramMap.get('id'));

   this.db.getFormulationsById(this.id).then(data => {
        this.formulation = data;
           this.setNav();
    });

    // this.formulation = this.service.getFormulationById(id);
    // if (!this.formulation) {
    //    this.goBack();
    // }
  }


  toggleFab() {
    this.isFabOpen = !this.isFabOpen;
  }


  edit(): void {
    this.isFabOpen = false;
    this.router.navigate(['app/formulation/edit', this.formulation?.id]);
  }


  // delete(): void {
  //   if (this.formulation && confirm('Are you sure you want to delete this formulation?')) {
  //     this.service.deleteFormulation(this.formulation.id);
  //     // this.router.navigate(['app/formulations']);
  //    this.goBack();
  //   }
  // }


  confirmDelete(): void {
    this.isFabOpen = false;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this formulation?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.formulation) {
        this.db.deleteFormulations(this.id);
        // this.service.deleteFormulation(this.formulation.id);
        this.goBack();
      }
    });
  }


  getData() {
      this.pestData = this.navegateService.getData(this.router);
      this.id = this.pestData.id;
      this.nameToNavegate = this.pestData.name 
  }


    goBack(): void {
      this.navegateService.goFavorites('formulations', this.id);
  }



    setNav() {
      this.navService.reSetNavConfig();

      let navConfig: NavConfig = new NavConfig();
      navConfig.title = "Formulation Detail";
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

