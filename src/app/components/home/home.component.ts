import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Feature, HeroContent, Testimonial, Statistic } from '../../models/feature.model';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-page">
      <section class="hero-section">
        <div class="hero-background">
          <div class="hero-overlay"></div>
        </div>
        <div class="container">
          <div class="hero-content">
            <div class="hero-text" *ngIf="heroContent">
              <h1>{{ heroContent.title }}</h1>
              <p>{{ heroContent.description }}</p>
              <div class="hero-buttons">
                <button mat-raised-button color="primary" [routerLink]="heroContent.primaryButtonLink">
                  <mat-icon>people</mat-icon>
                  {{ heroContent.primaryButtonText }}
                </button>
                <button mat-stroked-button color="primary" [routerLink]="heroContent.secondaryButtonLink">
                  <mat-icon>local_offer</mat-icon>
                  {{ heroContent.secondaryButtonText }}
                </button>
              </div>
            </div>
            <div class="hero-image">
              <div class="image-placeholder">
                <mat-icon>medical_services</mat-icon>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="features-section">
        <div class="container">
          <h2>Why Choose LabScan Pro?</h2>
          <div class="features-grid">
            <div class="feature-card" *ngFor="let feature of features">
              <mat-icon class="feature-icon">{{ feature.icon }}</mat-icon>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="doctors-section">
        <div class="container">
          <h2>Meet Our Expert Doctors</h2>
          <div class="doctors-grid">
            <div class="doctor-card" *ngFor="let doctor of doctors">
              <div class="doctor-image">
                <mat-icon class="default-avatar">person</mat-icon>
              </div>
              <div class="doctor-info">
                <h3>{{ doctor.name }}</h3>
                <p class="specialization">{{ doctor.specialization }}</p>
                <p class="experience">{{ doctor.experience }} years experience</p>
                <div class="rating">
                  <mat-icon *ngFor="let star of getStars(doctor.rating)">star</mat-icon>
                  <span>{{ doctor.rating }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="services-section">
        <div class="container">
          <h2>Our Scanning Services</h2>
          <div class="services-grid">
            <div class="service-card" *ngFor="let service of scanTypes">
              <mat-icon class="service-icon">scanner</mat-icon>
              <h3>{{ service.name }}</h3>
              <p>{{ service.description }}</p>
              <div class="service-details">
                <div class="service-info">
                  <mat-icon>schedule</mat-icon>
                  <span>{{ service.duration }}</span>
                </div>
                <div class="service-info">
                  <mat-icon>attach_money</mat-icon>
                  <span>\${{ service.price }}</span>
                </div>
              </div>
              <button mat-stroked-button color="primary" routerLink="/enquiry">
                <mat-icon>mail</mat-icon>
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Statistics Section -->
      <section class="statistics-section">
        <div class="container">
          <h2>Our Achievements</h2>
          <div class="statistics-grid">
            <div class="statistic-card" *ngFor="let stat of statistics">
              <mat-icon class="statistic-icon">{{ stat.icon }}</mat-icon>
              <h3>{{ stat.value }}</h3>
              <p>{{ stat.title }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="testimonials-section">
        <div class="container">
          <h2>What Our Patients Say</h2>
          <div class="testimonials-grid">
            <div class="testimonial-card" *ngFor="let testimonial of testimonials">
              <div class="testimonial-content">
                <div class="testimonial-rating">
                  <mat-icon *ngFor="let star of getStars(testimonial.rating)">star</mat-icon>
                </div>
                <p class="testimonial-text">"{{ testimonial.comment }}"</p>
                <div class="testimonial-author">
                  <h4>{{ testimonial.patientName }}</h4>
                  <p>{{ testimonial.treatment }} • Age {{ testimonial.patientAge }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      color: white;
      overflow: hidden;
    }
    
    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: -2;
    }
    
    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.3);
      z-index: -1;
    }
    
    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }
    
    .hero-text h1 {
      font-size: 3.5rem;
      margin-bottom: 25px;
      font-weight: 300;
      line-height: 1.2;
    }
    
    .hero-text p {
      font-size: 1.3rem;
      margin-bottom: 40px;
      opacity: 0.9;
      line-height: 1.6;
    }
    
    .hero-buttons {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
    
    .hero-buttons button {
      padding: 15px 30px;
      font-size: 1.1rem;
      font-weight: 500;
    }
    
    .hero-image {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .image-placeholder {
      width: 400px;
      height: 400px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255,255,255,0.2);
    }
    
    .image-placeholder mat-icon {
      font-size: 8rem;
      color: rgba(255,255,255,0.8);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .features-section {
      padding: 80px 0;
      background-color: #f8f9fa;
    }
    
    .features-section h2 {
      text-align: center;
      margin-bottom: 50px;
      font-size: 2.5rem;
      color: #2c3e50;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }
    
    .feature-card {
      text-align: center;
      padding: 30px 20px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
    }
    
    .feature-icon {
      font-size: 3rem;
      color: #3498db;
      margin-bottom: 20px;
    }
    
    .feature-card h3 {
      margin-bottom: 15px;
      color: #2c3e50;
    }
    
    .feature-card p {
      color: #7f8c8d;
      line-height: 1.6;
    }
    
    .doctors-section {
      padding: 80px 0;
    }
    
    .doctors-section h2 {
      text-align: center;
      margin-bottom: 50px;
      font-size: 2.5rem;
      color: #2c3e50;
    }
    
    .doctors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }
    
    .doctor-card {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }
    
    .doctor-card:hover {
      transform: translateY(-5px);
    }
    
    .doctor-image {
      width: 150px;
      height: 150px;
      margin: 0 auto 20px;
      border-radius: 50%;
      background-color: #ecf0f1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .default-avatar {
      font-size: 4rem;
      color: #bdc3c7;
    }
    
    .doctor-info h3 {
      margin-bottom: 10px;
      color: #2c3e50;
    }
    
    .specialization {
      color: #3498db;
      font-weight: 500;
      margin-bottom: 5px;
    }
    
    .experience {
      color: #7f8c8d;
      margin-bottom: 10px;
    }
    
    .rating {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      margin-bottom: 10px;
    }
    
    .rating mat-icon {
      color: #f39c12;
      font-size: 1.2rem;
    }
    
    .services-section {
      padding: 80px 0;
      background-color: #f8f9fa;
    }
    
    .services-section h2 {
      text-align: center;
      margin-bottom: 50px;
      font-size: 2.5rem;
      color: #2c3e50;
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }
    
    .service-card {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }
    
    .service-card:hover {
      transform: translateY(-5px);
    }
    
    .service-icon {
      font-size: 3rem;
      color: #3498db;
      margin-bottom: 20px;
    }
    
    .service-card h3 {
      margin-bottom: 15px;
      color: #2c3e50;
    }
    
    .service-card p {
      color: #7f8c8d;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    
    .service-details {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
    }
    
    .service-info {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #7f8c8d;
    }
    
    .statistics-section {
      padding: 80px 0;
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
      color: white;
    }
    
    .statistics-section h2 {
      text-align: center;
      margin-bottom: 50px;
      font-size: 2.5rem;
      color: white;
    }
    
    .statistics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 30px;
    }
    
    .statistic-card {
      text-align: center;
      padding: 30px 20px;
      background: rgba(255,255,255,0.1);
      border-radius: 15px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
      transition: transform 0.3s ease;
    }
    
    .statistic-card:hover {
      transform: translateY(-5px);
    }
    
    .statistic-icon {
      font-size: 3rem;
      color: #ecf0f1;
      margin-bottom: 15px;
    }
    
    .statistic-card h3 {
      margin: 0 0 10px 0;
      font-size: 2.5rem;
      font-weight: bold;
      color: white;
    }
    
    .statistic-card p {
      margin: 0;
      font-size: 1.1rem;
      opacity: 0.9;
    }
    
    .testimonials-section {
      padding: 80px 0;
      background-color: #f8f9fa;
    }
    
    .testimonials-section h2 {
      text-align: center;
      margin-bottom: 50px;
      font-size: 2.5rem;
      color: #2c3e50;
    }
    
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 30px;
    }
    
    .testimonial-card {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    
    .testimonial-card:hover {
      transform: translateY(-5px);
    }
    
    .testimonial-rating {
      display: flex;
      gap: 2px;
      margin-bottom: 20px;
    }
    
    .testimonial-rating mat-icon {
      color: #f39c12;
      font-size: 1.2rem;
    }
    
    .testimonial-text {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #2c3e50;
      margin-bottom: 20px;
      font-style: italic;
    }
    
    .testimonial-author h4 {
      margin: 0 0 5px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }
    
    .testimonial-author p {
      margin: 0;
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    @media (max-width: 1024px) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 40px;
      }
      
      .image-placeholder {
        width: 300px;
        height: 300px;
      }
      
      .image-placeholder mat-icon {
        font-size: 6rem;
      }
    }
    
    @media (max-width: 768px) {
      .hero-text h1 {
        font-size: 2.5rem;
      }
      
      .hero-text p {
        font-size: 1.1rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .hero-buttons button {
        width: 100%;
        max-width: 300px;
      }
      
      .image-placeholder {
        width: 250px;
        height: 250px;
      }
      
      .image-placeholder mat-icon {
        font-size: 4rem;
      }
      
      .features-grid,
      .doctors-grid,
      .services-grid,
      .statistics-grid,
      .testimonials-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  doctors: any[] = [];
  scanTypes: any[] = [];
  features: Feature[] = [];
  heroContent: HeroContent | null = null;
  testimonials: Testimonial[] = [];
  statistics: Statistic[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadAllData();
  }

  loadAllData() {
    // Load all data from database
    this.doctors = this.dataService.getDoctors();
    this.scanTypes = this.dataService.getScanTypes();
    this.features = this.dataService.getFeatures();
    this.heroContent = this.dataService.getHeroContent();
    this.testimonials = this.dataService.getTestimonials();
    this.statistics = this.dataService.getStatistics();
    
    console.log('Home page data loaded from database:');
    console.log('Doctors:', this.doctors.length);
    console.log('Scan Types:', this.scanTypes.length);
    console.log('Features:', this.features.length);
    console.log('Hero Content:', this.heroContent);
    console.log('Testimonials:', this.testimonials.length);
    console.log('Statistics:', this.statistics.length);
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}