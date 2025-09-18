import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" class="header-toolbar">
      <div class="header-content">
        <div class="logo-section">
          <mat-icon class="logo-icon">local_hospital</mat-icon>
          <span class="logo-text">LabScan Pro</span>
        </div>
        
        <nav class="nav-menu">
          <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <mat-icon>home</mat-icon>
            Home
          </a>
          <a mat-button routerLink="/doctors" routerLinkActive="active">
            <mat-icon>people</mat-icon>
            Doctors
          </a>
          <a mat-button routerLink="/offers" routerLinkActive="active">
            <mat-icon>local_offer</mat-icon>
            Offers
          </a>
          <a mat-button routerLink="/contact" routerLinkActive="active">
            <mat-icon>contact_mail</mat-icon>
            Contact
          </a>
          <a mat-button routerLink="/enquiry" routerLinkActive="active">
            <mat-icon>help</mat-icon>
            Enquiry
          </a>
          <a mat-button routerLink="/admin" routerLinkActive="active" class="admin-link">
            <mat-icon>admin_panel_settings</mat-icon>
            Admin
          </a>
        </nav>
        
        <div class="mobile-menu">
          <button mat-icon-button (click)="toggleMobileMenu()">
            <mat-icon>menu</mat-icon>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <div class="mobile-nav" [class.show]="showMobileMenu">
        <a mat-button routerLink="/" (click)="closeMobileMenu()">
          <mat-icon>home</mat-icon>
          Home
        </a>
        <a mat-button routerLink="/doctors" (click)="closeMobileMenu()">
          <mat-icon>people</mat-icon>
          Doctors
        </a>
        <a mat-button routerLink="/offers" (click)="closeMobileMenu()">
          <mat-icon>local_offer</mat-icon>
          Offers
        </a>
        <a mat-button routerLink="/contact" (click)="closeMobileMenu()">
          <mat-icon>contact_mail</mat-icon>
          Contact
        </a>
        <a mat-button routerLink="/enquiry" (click)="closeMobileMenu()">
          <mat-icon>help</mat-icon>
          Enquiry
        </a>
        <a mat-button routerLink="/admin" (click)="closeMobileMenu()">
          <mat-icon>admin_panel_settings</mat-icon>
          Admin
        </a>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .logo-section {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .logo-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
    
    .logo-text {
      font-size: 24px;
      font-weight: 500;
    }
    
    .nav-menu {
      display: flex;
      gap: 10px;
    }
    
    .nav-menu a {
      color: white;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 0 15px;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    
    .nav-menu a:hover {
      background-color: rgba(255,255,255,0.1);
    }
    
    .nav-menu a.active {
      background-color: rgba(255,255,255,0.2);
    }
    
    .admin-link {
      background-color: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.3);
    }
    
    .mobile-menu {
      display: none;
    }
    
    .mobile-nav {
      display: none;
      flex-direction: column;
      background-color: #1976d2;
      padding: 10px 0;
    }
    
    .mobile-nav.show {
      display: flex;
    }
    
    .mobile-nav a {
      color: white;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .mobile-nav a:hover {
      background-color: rgba(255,255,255,0.1);
    }
    
    @media (max-width: 768px) {
      .nav-menu {
        display: none;
      }
      
      .mobile-menu {
        display: block;
      }
    }
  `]
})
export class HeaderComponent {
  showMobileMenu = false;

  constructor(private router: Router) {}

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
  }
}
