import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-doctor-details',
  template: `
    <div class="doctor-details" *ngIf="doctor">
      <!-- Doctor Header -->
      <section class="doctor-header">
        <div class="container">
          <div class="doctor-profile">
            <div class="doctor-image">
              <img [src]="doctor.imageUrl" [alt]="doctor.name" *ngIf="doctor.imageUrl">
              <mat-icon *ngIf="!doctor.imageUrl" class="default-avatar">person</mat-icon>
            </div>
            <div class="doctor-info">
              <h1>{{ doctor.name }}</h1>
              <p class="specialization">{{ doctor.specialization }}</p>
              <p class="qualification">{{ doctor.qualification }}</p>
              <div class="rating">
                <mat-icon *ngFor="let star of getStars(doctor.rating)">star</mat-icon>
                <span>{{ doctor.rating }} ({{ doctor.experience }} years experience)</span>
              </div>
              <div class="consultation-fee">
                <mat-icon>attach_money</mat-icon>
                <span>Consultation Fee: \${{ doctor.consultationFee }}</span>
              </div>
            </div>
            <div class="doctor-actions">
              <button mat-raised-button color="primary" (click)="bookConsultation()">
                <mat-icon>calendar_today</mat-icon>
                Book Consultation
              </button>
              <button mat-stroked-button color="primary" (click)="sendEnquiry()">
                <mat-icon>mail</mat-icon>
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Doctor Details Tabs -->
      <section class="doctor-content">
        <div class="container">
          <mat-tab-group>
            <!-- About Tab -->
            <mat-tab label="About">
              <div class="tab-content">
                <h3>About Dr. {{ doctor.name }}</h3>
                <p class="bio">{{ doctor.bio }}</p>
                
                <div class="details-grid">
                  <div class="detail-item">
                    <mat-icon>work</mat-icon>
                    <div>
                      <h4>Specialization</h4>
                      <p>{{ doctor.specialization }}</p>
                    </div>
                  </div>
                  
                  <div class="detail-item">
                    <mat-icon>school</mat-icon>
                    <div>
                      <h4>Qualification</h4>
                      <p>{{ doctor.qualification }}</p>
                    </div>
                  </div>
                  
                  <div class="detail-item">
                    <mat-icon>schedule</mat-icon>
                    <div>
                      <h4>Experience</h4>
                      <p>{{ doctor.experience }} years</p>
                    </div>
                  </div>
                  
                  <div class="detail-item">
                    <mat-icon>star</mat-icon>
                    <div>
                      <h4>Rating</h4>
                      <p>{{ doctor.rating }}/5.0</p>
                    </div>
                  </div>
                </div>
              </div>
            </mat-tab>

            <!-- Contact Info Tab -->
            <mat-tab label="Contact Information">
              <div class="tab-content">
                <h3>Contact Information</h3>
                
                <div class="contact-details">
                  <div class="contact-item">
                    <mat-icon>phone</mat-icon>
                    <div>
                      <h4>Phone</h4>
                      <p>{{ doctor.phone }}</p>
                    </div>
                  </div>
                  
                  <div class="contact-item">
                    <mat-icon>email</mat-icon>
                    <div>
                      <h4>Email</h4>
                      <p>{{ doctor.email }}</p>
                    </div>
                  </div>
                  
                  <div class="contact-item">
                    <mat-icon>location_on</mat-icon>
                    <div>
                      <h4>Address</h4>
                      <p>{{ doctor.address }}<br>
                         {{ doctor.city }}, {{ doctor.state }} {{ doctor.pincode }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </mat-tab>

            <!-- Availability Tab -->
            <mat-tab label="Availability">
              <div class="tab-content">
                <h3>Availability</h3>
                
                <div class="availability-info">
                  <div class="availability-item">
                    <mat-icon>schedule</mat-icon>
                    <div>
                      <h4>Available Days</h4>
                      <div class="days-list">
                        <span class="day-chip" *ngFor="let day of doctor.availableDays">{{ day }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="availability-item">
                    <mat-icon>access_time</mat-icon>
                    <div>
                      <h4>Available Time</h4>
                      <p>{{ doctor.availableTime }}</p>
                    </div>
                  </div>
                  
                  <div class="availability-item">
                    <mat-icon>attach_money</mat-icon>
                    <div>
                      <h4>Consultation Fee</h4>
                      <p>\${{ doctor.consultationFee }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </mat-tab>

            <!-- Reviews Tab -->
            <mat-tab label="Reviews">
              <div class="tab-content">
                <h3>Patient Reviews</h3>
                
                <div class="reviews-summary">
                  <div class="rating-overview">
                    <div class="overall-rating">
                      <span class="rating-number">{{ doctor.rating }}</span>
                      <div class="rating-stars">
                        <mat-icon *ngFor="let star of getStars(doctor.rating)">star</mat-icon>
                      </div>
                      <p>Based on 127 reviews</p>
                    </div>
                  </div>
                </div>
                
                <div class="reviews-list">
                  <div class="review-item" *ngFor="let review of sampleReviews">
                    <div class="review-header">
                      <div class="reviewer-info">
                        <h4>{{ review.patientName }}</h4>
                        <div class="review-rating">
                          <mat-icon *ngFor="let star of getStars(review.rating)">star</mat-icon>
                        </div>
                      </div>
                      <span class="review-date">{{ review.date }}</span>
                    </div>
                    <p class="review-text">{{ review.comment }}</p>
                  </div>
                </div>
              </div>
            </mat-tab>
          </mat-tab-group>
        </div>
      </section>
    </div>

    <!-- Loading State -->
    <div class="loading-container" *ngIf="!doctor">
      <mat-spinner></mat-spinner>
      <p>Loading doctor details...</p>
    </div>
  `,
  styles: [`
    .doctor-details {
      min-height: 100vh;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .doctor-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 60px 0;
    }
    
    .doctor-profile {
      display: grid;
      grid-template-columns: 200px 1fr auto;
      gap: 40px;
      align-items: center;
    }
    
    .doctor-image {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
      background-color: rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .doctor-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .default-avatar {
      font-size: 4rem;
      color: rgba(255,255,255,0.7);
    }
    
    .doctor-info h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      font-weight: 300;
    }
    
    .specialization {
      font-size: 1.3rem;
      margin-bottom: 5px;
      opacity: 0.9;
    }
    
    .qualification {
      font-size: 1.1rem;
      margin-bottom: 15px;
      opacity: 0.8;
    }
    
    .rating {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 10px;
    }
    
    .rating mat-icon {
      color: #f39c12;
    }
    
    .consultation-fee {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 1.1rem;
    }
    
    .doctor-actions {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .doctor-actions button {
      padding: 12px 24px;
      font-size: 1rem;
    }
    
    .doctor-content {
      padding: 60px 0;
    }
    
    .tab-content {
      padding: 30px 0;
    }
    
    .tab-content h3 {
      margin-bottom: 30px;
      color: #2c3e50;
      font-size: 1.8rem;
    }
    
    .bio {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #7f8c8d;
      margin-bottom: 40px;
    }
    
    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }
    
    .detail-item {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 10px;
    }
    
    .detail-item mat-icon {
      color: #3498db;
      font-size: 2rem;
      margin-top: 5px;
    }
    
    .detail-item h4 {
      margin: 0 0 5px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }
    
    .detail-item p {
      margin: 0;
      color: #7f8c8d;
    }
    
    .contact-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }
    
    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 10px;
    }
    
    .contact-item mat-icon {
      color: #3498db;
      font-size: 2rem;
      margin-top: 5px;
    }
    
    .contact-item h4 {
      margin: 0 0 5px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }
    
    .contact-item p {
      margin: 0;
      color: #7f8c8d;
      line-height: 1.6;
    }
    
    .availability-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }
    
    .availability-item {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 10px;
    }
    
    .availability-item mat-icon {
      color: #3498db;
      font-size: 2rem;
      margin-top: 5px;
    }
    
    .availability-item h4 {
      margin: 0 0 10px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }
    
    .days-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .day-chip {
      background: #3498db;
      color: white;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.9rem;
    }
    
    .reviews-summary {
      margin-bottom: 40px;
    }
    
    .rating-overview {
      display: flex;
      align-items: center;
      gap: 30px;
      padding: 30px;
      background: #f8f9fa;
      border-radius: 10px;
    }
    
    .overall-rating {
      text-align: center;
    }
    
    .rating-number {
      /*font-size: 3rem;*/
      font-weight: bold;
      color: #2c3e50;
      display: block;
    }
    
    .rating-stars {
      display: flex;
      justify-content: center;
      gap: 2px;
      margin: 10px 0;
    }
    
    .rating-stars mat-icon {
      color: #f39c12;
      font-size: 1.5rem;
    }
    
    .reviews-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .review-item {
      padding: 20px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
    
    .reviewer-info h4 {
      margin: 0 0 5px 0;
      color: #2c3e50;
    }
    
    .review-rating {
      display: flex;
      gap: 2px;
    }
    
    .review-rating mat-icon {
      color: #f39c12;
      font-size: 1.2rem;
    }
    
    .review-date {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .review-text {
      color: #7f8c8d;
      line-height: 1.6;
      margin: 0;
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 50vh;
      gap: 20px;
    }
    
    .loading-container p {
      color: #7f8c8d;
      font-size: 1.1rem;
    }
    
    @media (max-width: 1024px) {
      .doctor-profile {
        grid-template-columns: 150px 1fr auto;
        gap: 30px;
      }
      
      .doctor-image {
        width: 150px;
        height: 150px;
      }
      
      .doctor-info h1 {
        font-size: 2rem;
      }
    }
    
    @media (max-width: 768px) {
      .doctor-header {
        padding: 40px 0;
      }
      
      .doctor-profile {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 20px;
      }
      
      .doctor-image {
        width: 120px;
        height: 120px;
        margin: 0 auto;
      }
      
      .doctor-info h1 {
        font-size: 1.8rem;
      }
      
      .specialization {
        font-size: 1.1rem;
      }
      
      .qualification {
        font-size: 1rem;
      }
      
      .doctor-actions {
        flex-direction: row;
        justify-content: center;
        gap: 10px;
      }
      
      .doctor-actions button {
        padding: 10px 20px;
        font-size: 0.9rem;
      }
      
      .details-grid,
      .contact-details,
      .availability-info {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .detail-item,
      .contact-item,
      .availability-item {
        padding: 15px;
      }
      
      .rating-overview {
        flex-direction: column;
        text-align: center;
        gap: 20px;
      }
      
      .container {
        padding: 0 15px;
      }
    }
    
    @media (max-width: 480px) {
      .doctor-actions {
        flex-direction: column;
        width: 100%;
      }
      
      .doctor-actions button {
        width: 100%;
      }
      
      .form-container {
        padding: 15px;
      }
      
      .page-header h1 {
        font-size: 2rem;
      }
      
      .page-header p {
        font-size: 1rem;
      }
    }
  `]
})
export class DoctorDetailsComponent implements OnInit {
  doctor: Doctor | undefined;
  sampleReviews = [
    {
      patientName: 'John Smith',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Dr. Johnson was excellent. Very thorough and explained everything clearly. Highly recommended!'
    },
    {
      patientName: 'Sarah Wilson',
      rating: 5,
      date: '1 month ago',
      comment: 'Professional and caring. The scan was quick and painless. Great experience overall.'
    },
    {
      patientName: 'Mike Davis',
      rating: 4,
      date: '2 months ago',
      comment: 'Good service and clear communication. Results were delivered on time.'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const doctorId = params.get('id');
      console.log('Looking for doctor with ID:', doctorId);
      
      if (doctorId) {
        // Get all doctors first to debug
        const allDoctors = this.dataService.getAllDoctors();
        console.log('All doctors in database:', allDoctors);
        console.log('All doctor IDs:', allDoctors.map(d => d.id));
        
        this.doctor = this.dataService.getDoctorById(doctorId);
        console.log('Found doctor:', this.doctor);
        
        if (!this.doctor) {
          console.error('Doctor not found with ID:', doctorId);
          console.log('Available doctor IDs:', allDoctors.map(d => d.id));
          this.router.navigate(['/doctors']);
        }
      } else {
        console.error('No doctor ID provided in route');
        this.router.navigate(['/doctors']);
      }
    });
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  bookConsultation() {
    this.router.navigate(['/scan'], { queryParams: { doctor: this.doctor?.id } });
  }

  sendEnquiry() {
    this.router.navigate(['/enquiry'], { queryParams: { doctor: this.doctor?.id } });
  }
}
