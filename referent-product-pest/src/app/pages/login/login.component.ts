import { Component, inject, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProductService } from '../../services/product.service';
import { TechnicalProductService } from '../../services/TechnicalProductService';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MixProductTechNoteService } from '../../services/mix-product-tech-note.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,

    MatListModule,],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  private technicalProductService = inject(TechnicalProductService);
  private mixProductTechNoteService = inject(MixProductTechNoteService);
  private userList: User[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private productService: ProductService,
    private userService: UserService) {
    this.userService.getListUser().subscribe(users => {
      if (users) {
        this.userList = users;
      }
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    const unUser: User | null = this.findUserByCredentials();
    if (unUser) {
      this.chargeData();
      this.authService.loginU(unUser.rol);
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Incorrect username or password';
    }
  }

  chargeData() {
    this.productService.loadProducts();
    this.technicalProductService.loadProducts();
    this.mixProductTechNoteService.loadMixData();
  }

  findUserByCredentials() {
    const found = this.userList.find(u => u.username === this.username && u.password === this.password);
    return found ? found : null;
  }


}
