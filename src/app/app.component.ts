import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header class="header">
        <div class="container">
          <h1>LabScan Pro</h1>
          <nav>
            <a routerLink="/" routerLinkActive="active">Home</a>
            <a routerLink="/doctors" routerLinkActive="active">Doctors</a>
            <a routerLink="/contact" routerLinkActive="active">Contact</a>
            <a routerLink="/admin" routerLinkActive="active">Admin</a>
          </nav>
        </div>
      </header>
      
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      
      <footer class="footer">
        <div class="container">
          <p>&copy; 2025 LabScan Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .header {
      background: #2c3e50;
      color: white;
      padding: 1rem 0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .header h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    
    .header nav {
      display: flex;
      gap: 20px;
    }
    
    .header nav a {
      color: white;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    
    .header nav a:hover,
    .header nav a.active {
      background-color: #3498db;
    }
    
    .main-content {
      flex: 1;
      padding: 2rem 0;
    }
    
    .footer {
      background: #34495e;
      color: white;
      padding: 1rem 0;
      text-align: center;
    }
    
    @media (max-width: 768px) {
      .container {
        flex-direction: column;
        gap: 1rem;
      }
      
      .header nav {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  `]
})
export class AppComponent {
  title = 'Lab Scanning App';
}