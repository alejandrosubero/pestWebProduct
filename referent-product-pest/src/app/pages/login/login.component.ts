import { Component, OnInit } from '@angular/core';
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

  private configUrl: string = 'assets/config/config.json';
  private storedUser: string = '';
  private storedPassword: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
   private productService: ProductService) {}

  

  ngOnInit(): void {
    this.http.get<any>(this.configUrl).subscribe({
      next: (data) => {
        this.storedUser = data.username;
        this.storedPassword = data.password;
      },
      error: (error) => {
        console.error('Error loading config.json', error);
        this.errorMessage = 'Internal error, contact support';
      },
    });
  }

 
  login(): void {

  if (
    this.username === this.storedUser &&
    this.password === this.storedPassword
  ) {
    this.productService.loadProducts();
    this.authService.login(); // Guardar estado
    this.router.navigate(['/home']);
  } else {
    this.errorMessage = 'Incorrect username or password';
  }
}

}
