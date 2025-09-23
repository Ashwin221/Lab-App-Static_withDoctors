import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-page">
      <div class="login-container">
        <div class="login-card">
          <div class="login-header">
            <div class="logo">
              <mat-icon>medical_services</mat-icon>
              <h1>LabScan Pro</h1>
            </div>
            <h2>Admin Login</h2>
            <p>Sign in to access the admin dashboard</p>
          </div>
          
          <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="login-form">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email Address</mat-label>
              <input matInput 
                     type="email" 
                     formControlName="email" 
                     placeholder="admin@user.in"
                     autocomplete="email">
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput 
                     [type]="hidePassword ? 'password' : 'text'" 
                     formControlName="password"
                     placeholder="Enter your password"
                     autocomplete="current-password">
              <button mat-icon-button 
                      matSuffix 
                      type="button"
                      (click)="hidePassword = !hidePassword"
                      [attr.aria-label]="'Hide password'"
                      [attr.aria-pressed]="hidePassword">
                <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('password')?.hasError('minlength')">
                Password must be at least 6 characters
              </mat-error>
            </mat-form-field>
            
            <div class="form-actions">
              <button mat-raised-button 
                      color="primary" 
                      type="submit" 
                      class="login-button"
                      [disabled]="loginForm.invalid || isLoading">
                <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
                <mat-icon *ngIf="!isLoading">login</mat-icon>
                {{ isLoading ? 'Signing In...' : 'Sign In' }}
              </button>
            </div>
          </form>
          
          <div class="login-footer">
            <p>Having trouble signing in?</p>
            <button mat-button color="primary" (click)="goToWebsite()">
              <mat-icon>home</mat-icon>
              Back to Website
            </button>
          </div>
        </div>
        
        <div class="login-info">
          <h3>Welcome to LabScan Pro Admin</h3>
          <div class="info-cards">
            <div class="info-card">
              <mat-icon>dashboard</mat-icon>
              <h4>Dashboard</h4>
              <p>Monitor all activities and statistics</p>
            </div>
            <div class="info-card">
              <mat-icon>people</mat-icon>
              <h4>Manage Doctors</h4>
              <p>Add, edit, and manage doctor profiles</p>
            </div>
            <div class="info-card">
              <mat-icon>scanner</mat-icon>
              <h4>Scan Records</h4>
              <p>View and manage scan appointments</p>
            </div>
            <div class="info-card">
              <mat-icon>contact_mail</mat-icon>
              <h4>Messages</h4>
              <p>Handle patient enquiries and contacts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .login-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      max-width: 1200px;
      width: 100%;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .login-card {
      padding: 60px 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .login-header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      margin-bottom: 20px;
    }
    
    .logo mat-icon {
      /*font-size: 3rem;*/
      color: #3498db;
    }
    
    .logo h1 {
      margin: 0;
      color: #2c3e50;
      font-size: 2rem;
      font-weight: 300;
    }
    
    .login-header h2 {
      margin: 0 0 10px 0;
      color: #2c3e50;
      font-size: 1.8rem;
    }
    
    .login-header p {
      margin: 0;
      color: #7f8c8d;
      font-size: 1rem;
    }
    
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .full-width {
      width: 100%;
    }
    
    .form-actions {
      margin-top: 20px;
    }
    
    .login-button {
      width: 100%;
      padding: 15px;
      font-size: 1.1rem;
      font-weight: 500;
    }
    
    .login-footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
    
    .login-footer p {
      margin: 0 0 15px 0;
      color: #7f8c8d;
    }
    
    .login-info {
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
      color: white;
      padding: 60px 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .login-info h3 {
      margin: 0 0 40px 0;
      font-size: 2rem;
      text-align: center;
    }
    
    .info-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    
    .info-card {
      text-align: center;
      padding: 20px;
      background: rgba(255,255,255,0.1);
      border-radius: 10px;
      backdrop-filter: blur(10px);
    }
    
    .info-card mat-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
      color: #ecf0f1;
    }
    
    .info-card h4 {
      margin: 0 0 10px 0;
      font-size: 1.1rem;
    }
    
    .info-card p {
      margin: 0;
      font-size: 0.9rem;
      opacity: 0.8;
    }
    
    @media (max-width: 768px) {
      .login-container {
        grid-template-columns: 1fr;
        gap: 0;
      }
      
      .login-card {
        padding: 40px 20px;
      }
      
      .login-info {
        padding: 40px 20px;
      }
      
      .info-cards {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Check if already logged in
    this.auth.isLoggedIn$().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/admin']);
      }
    });
  }

  async onLogin() {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      
      try {
        await this.auth.signInWithEmail(email, password);
        this.snackBar.open('Login successful! Welcome to admin dashboard.', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/admin']);
      } catch (error: any) {
        console.error('Login error:', error);
        this.snackBar.open('Login failed. Please check your credentials.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      } finally {
        this.isLoading = false;
      }
    }
  }

  goToWebsite() {
    this.router.navigate(['/']);
  }
}


