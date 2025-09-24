import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>LabScan Pro</h3>
          <p>Your trusted partner for advanced medical scanning and diagnostic services.</p>
          <div class="social-links">
            <a href="#" mat-icon-button>
              <mat-icon>facebook</mat-icon>
            </a>
            <a href="#" mat-icon-button>
              <mat-icon>twitter</mat-icon>
            </a>
            <a href="#" mat-icon-button>
              <mat-icon>linkedin</mat-icon>
            </a>
            <a href="#" mat-icon-button>
              <mat-icon>instagram</mat-icon>
            </a>
          </div>
        </div>
        
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/doctors">Our Doctors</a></li>
            <li><a routerLink="/scan">Book Scan</a></li>
            <li><a routerLink="/contact">Contact Us</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Services</h4>
          <ul>
            <li>MRI Scan</li>
            <li>CT Scan</li>
            <li>Ultrasound</li>
            <li>X-Ray</li>
            <li>Cardiology</li>
            <li>Neurology</li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Contact Info</h4>
          <div class="contact-info">
            <div class="contact-item">
              <mat-icon>location_on</mat-icon>
              <span>123 Medical Center Dr<br>New York, NY 10001</span>
            </div>
            <div class="contact-item">
              <mat-icon>phone</mat-icon>
              <span>+1-555-0123</span>
            </div>
            <div class="contact-item">
              <mat-icon>email</mat-icon>
              <span>info@labscan.com</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 LabScan Pro. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #2c3e50;
      color: white;
      padding: 40px 0 20px;
      margin-top: auto;
    }
    
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }
    
    .footer-section h3 {
      color: #3498db;
      margin-bottom: 15px;
      font-size: 24px;
    }
    
    .footer-section h4 {
      color: #ecf0f1;
      margin-bottom: 15px;
      font-size: 18px;
    }
    
    .footer-section p {
      color: #bdc3c7;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    
    .social-links {
      display: flex;
      gap: 10px;
    }
    
    .social-links a {
      color: #bdc3c7;
      transition: color 0.3s;
    }
    
    .social-links a:hover {
      color: #3498db;
    }
    
    .footer-section ul {
      list-style: none;
      padding: 0;
    }
    
    .footer-section ul li {
      margin-bottom: 8px;
    }
    
    .footer-section ul li a {
      color: #bdc3c7;
      text-decoration: none;
      transition: color 0.3s;
    }
    
    .footer-section ul li a:hover {
      color: #3498db;
    }
    
    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }
    
    .contact-item mat-icon {
      color: #3498db;
      margin-top: 2px;
    }
    
    .contact-item span {
      color: #bdc3c7;
      line-height: 1.4;
    }
    
    .footer-bottom {
      border-top: 1px solid #34495e;
      margin-top: 30px;
      padding-top: 20px;
      text-align: center;
    }
    
    .footer-bottom p {
      color: #bdc3c7;
      margin: 0;
    }
    
    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }
  `]
})
export class FooterComponent {}
