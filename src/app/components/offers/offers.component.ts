import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  template: `
    <!-- Hero Section -->
    <section class="offers-hero">
      <div class="container">
        <div class="hero-content">
          <h1>Special Offers & Packages</h1>
          <p>Get the best value for your medical scanning needs with our exclusive offers</p>
        </div>
      </div>
    </section>

    <!-- Current Offers -->
    <section class="current-offers">
      <div class="container">
        <h2>Current Offers</h2>
        <div class="offers-grid">
          <div class="offer-card featured">
            <div class="offer-badge">Most Popular</div>
            <div class="offer-header">
              <h3>Complete Health Package</h3>
              <div class="offer-price">
                <span class="original-price">1,200</span>
                <span class="discounted-price">899</span>
                <span class="discount">25% OFF</span>
              </div>
            </div>
            <div class="offer-content">
              <ul class="offer-features">
                <li><mat-icon>check_circle</mat-icon> Full Body MRI Scan</li>
                <li><mat-icon>check_circle</mat-icon> CT Scan (Chest & Abdomen)</li>
                <li><mat-icon>check_circle</mat-icon> Ultrasound (All Organs)</li>
                <li><mat-icon>check_circle</mat-icon> Blood Tests (Complete Panel)</li>
                <li><mat-icon>check_circle</mat-icon> Doctor Consultation</li>
                <li><mat-icon>check_circle</mat-icon> Digital Report Delivery</li>
              </ul>
              <div class="offer-validity">
                <mat-icon>schedule</mat-icon>
                <span>Valid until December 31, 2024</span>
              </div>
            </div>
            <button mat-raised-button color="primary" class="offer-button">
              <mat-icon>shopping_cart</mat-icon>
              Book Now
            </button>
          </div>

          <div class="offer-card">
            <div class="offer-header">
              <h3>Family Health Check</h3>
              <div class="offer-price">
                <span class="original-price">800</span>
                <span class="discounted-price">599</span>
                <span class="discount">15% OFF</span>
              </div>
            </div>
            <div class="offer-content">
              <ul class="offer-features">
                <li><mat-icon>check_circle</mat-icon> 2 Adults + 2 Children</li>
                <li><mat-icon>check_circle</mat-icon> Basic Health Screening</li>
                <li><mat-icon>check_circle</mat-icon> X-Ray (Chest)</li>
                <li><mat-icon>check_circle</mat-icon> Blood Tests</li>
                <li><mat-icon>check_circle</mat-icon> Doctor Consultation</li>
              </ul>
              <div class="offer-validity">
                <mat-icon>schedule</mat-icon>
                <span>Valid until November 30, 2024</span>
              </div>
            </div>
            <button mat-raised-button color="accent" class="offer-button">
              <mat-icon>family_restroom</mat-icon>
              Book Family Package
            </button>
          </div>

          <div class="offer-card">
            <div class="offer-header">
              <h3>Senior Citizen Special</h3>
              <div class="offer-price">
                <span class="original-price">600</span>
                <span class="discounted-price">450</span>
                <span class="discount">20% OFF</span>
              </div>
            </div>
            <div class="offer-content">
              <ul class="offer-features">
                <li><mat-icon>check_circle</mat-icon> Age 60+ Only</li>
                <li><mat-icon>check_circle</mat-icon> Cardiac Screening</li>
                <li><mat-icon>check_circle</mat-icon> Bone Density Scan</li>
                <li><mat-icon>check_circle</mat-icon> Diabetes Panel</li>
                <li><mat-icon>check_circle</mat-icon> Free Home Collection</li>
              </ul>
              <div class="offer-validity">
                <mat-icon>schedule</mat-icon>
                <span>Valid until December 15, 2024</span>
              </div>
            </div>
            <button mat-raised-button color="primary" class="offer-button">
              <mat-icon>elderly</mat-icon>
              Book Senior Package
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Seasonal Offers -->
    <section class="seasonal-offers">
      <div class="container">
        <h2>Seasonal Specials</h2>
        <div class="seasonal-grid">
          <div class="seasonal-card">
            <div class="seasonal-image">
              <mat-icon>favorite</mat-icon>
            </div>
            <div class="seasonal-content">
              <h3>Heart Health Month</h3>
              <p>Special cardiac screening packages with 30% off on all heart-related tests</p>
              <div class="seasonal-price">Up to 30% OFF</div>
            </div>
          </div>

          <div class="seasonal-card">
            <div class="seasonal-image">
              <mat-icon>pregnant_woman</mat-icon>
            </div>
            <div class="seasonal-content">
              <h3>Women's Health Week</h3>
              <p>Comprehensive women's health packages including mammography and gynecological scans</p>
              <div class="seasonal-price">25% OFF</div>
            </div>
          </div>

          <div class="seasonal-card">
            <div class="seasonal-image">
              <mat-icon>child_care</mat-icon>
            </div>
            <div class="seasonal-content">
              <h3>Children's Health</h3>
              <p>Special pediatric packages designed for children's unique health needs</p>
              <div class="seasonal-price">20% OFF</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Terms & Conditions -->
    <section class="terms-section">
      <div class="container">
        <h2>Terms & Conditions</h2>
        <div class="terms-content">
          <div class="terms-item">
            <mat-icon>info</mat-icon>
            <div>
              <h4>Validity</h4>
              <p>All offers are valid for the specified period and cannot be combined with other discounts.</p>
            </div>
          </div>
          <div class="terms-item">
            <mat-icon>schedule</mat-icon>
            <div>
              <h4>Appointment</h4>
              <p>Advance booking required. Same-day appointments subject to availability.</p>
            </div>
          </div>
          <div class="terms-item">
            <mat-icon>payment</mat-icon>
            <div>
              <h4>Payment</h4>
              <p>Full payment required at the time of booking. Refunds as per policy.</p>
            </div>
          </div>
          <div class="terms-item">
            <mat-icon>support</mat-icon>
            <div>
              <h4>Support</h4>
              <p>24/7 customer support available for all package bookings.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Book Your Health Package?</h2>
          <p>Contact us today to schedule your appointment and take advantage of these exclusive offers</p>
          <div class="cta-buttons">
            <button mat-raised-button color="primary" size="large">
              <mat-icon>phone</mat-icon>
              Call Now: +91 7898798788
            </button>
            <button mat-stroked-button color="primary" size="large">
              <mat-icon>email</mat-icon>
              Send Enquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .offers-hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 100px 0;
      text-align: center;
    }
    
    .hero-content h1 {
      font-size: 3.5rem;
      margin-bottom: 20px;
      font-weight: 300;
    }
    
    .hero-content p {
      font-size: 1.3rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .current-offers {
      padding: 80px 0;
      background-color: #f8f9fa;
    }
    
    .current-offers h2 {
      text-align: center;
      margin-bottom: 50px;
      font-size: 2.5rem;
      color: #2c3e50;
    }
    
    .offers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 30px;
    }
    
    .offer-card {
      background: white;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      padding: 30px;
      position: relative;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .offer-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }
    
    .offer-card.featured {
      border: 3px solid #3498db;
      transform: scale(1.05);
    }
    
    .offer-badge {
      position: absolute;
      top: -10px;
      right: 20px;
      background: #e74c3c;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .offer-header {
      text-align: center;
      margin-bottom: 25px;
    }
    
    .offer-header h3 {
      margin: 0 0 15px 0;
      color: #2c3e50;
      font-size: 1.5rem;
    }
    
    .offer-price {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      flex-wrap: wrap;
    }
    
    .original-price {
      text-decoration: line-through;
      color: #7f8c8d;
      font-size: 1.2rem;
    }
    
    .discounted-price {
      color: #e74c3c;
      font-size: 2rem;
      font-weight: bold;
    }
    
    .discount {
      background: #e74c3c;
      color: white;
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 0.9rem;
      font-weight: 600;
    }
    
    .offer-features {
      list-style: none;
      padding: 0;
      margin: 0 0 20px 0;
    }
    
    .offer-features li {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
      color: #2c3e50;
    }
    
    .offer-features mat-icon {
      color: #27ae60;
      font-size: 1.2rem;
    }
    
    .offer-validity {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #7f8c8d;
      font-size: 0.9rem;
      margin-bottom: 20px;
    }
    
    .offer-validity mat-icon {
      font-size: 1rem;
    }
    
    .offer-button {
      width: 100%;
      padding: 15px;
      font-size: 1.1rem;
      font-weight: 600;
    }
    
    .seasonal-offers {
      padding: 80px 0;
    }
    
    .seasonal-offers h2 {
      text-align: center;
      margin-bottom: 50px;
      font-size: 2.5rem;
      color: #2c3e50;
    }
    
    .seasonal-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }
    
    .seasonal-card {
      background: white;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.3s ease;
    }
    
    .seasonal-card:hover {
      transform: translateY(-5px);
    }
    
    .seasonal-image {
      background: linear-gradient(135deg, #3498db, #2980b9);
      color: white;
      padding: 40px;
      text-align: center;
    }
    
    .seasonal-image mat-icon {
      font-size: 4rem;
    }
    
    .seasonal-content {
      padding: 30px;
    }
    
    .seasonal-content h3 {
      margin: 0 0 15px 0;
      color: #2c3e50;
      font-size: 1.3rem;
    }
    
    .seasonal-content p {
      color: #7f8c8d;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    
    .seasonal-price {
      background: #e74c3c;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
      display: inline-block;
    }
    
    .terms-section {
      padding: 80px 0;
      background-color: #f8f9fa;
    }
    
    .terms-section h2 {
      text-align: center;
      margin-bottom: 50px;
      font-size: 2.5rem;
      color: #2c3e50;
    }
    
    .terms-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }
    
    .terms-item {
      display: flex;
      gap: 15px;
      padding: 20px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .terms-item mat-icon {
      color: #3498db;
      font-size: 2rem;
      margin-top: 5px;
    }
    
    .terms-item h4 {
      margin: 0 0 10px 0;
      color: #2c3e50;
    }
    
    .terms-item p {
      margin: 0;
      color: #7f8c8d;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    
    .cta-section {
      padding: 80px 0;
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
      color: white;
      text-align: center;
    }
    
    .cta-content h2 {
      margin: 0 0 20px 0;
      font-size: 2.5rem;
    }
    
    .cta-content p {
      margin: 0 0 40px 0;
      font-size: 1.2rem;
      opacity: 0.9;
    }
    
    .cta-buttons {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .cta-buttons button {
      padding: 15px 30px;
      font-size: 1.1rem;
    }
    
    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2.5rem;
      }
      
      .offers-grid {
        grid-template-columns: 1fr;
      }
      
      .offer-card.featured {
        transform: none;
      }
      
      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .cta-buttons button {
        width: 100%;
        max-width: 300px;
      }
    }
  `]
})
export class OffersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
