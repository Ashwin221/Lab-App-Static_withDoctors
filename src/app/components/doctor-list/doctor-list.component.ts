import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Doctor } from '../../models/doctor.model';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-doctor-list',
  template: `
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Our Expert Doctors</h1>
        <p>Meet our team of experienced medical professionals</p>
      </div>
    </section>

    <!-- Search and Filter -->
    <section class="search-section">
      <div class="container">
        <div class="search-controls">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search doctors</mat-label>
            <input matInput [(ngModel)]="searchTerm" (input)="filterDoctors()" placeholder="Search by name, specialization, or qualification">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="filter-field">
            <mat-label>Specialization</mat-label>
            <mat-select [(ngModel)]="selectedSpecialization" (selectionChange)="filterDoctors()">
              <mat-option value="">All Specializations</mat-option>
              <mat-option *ngFor="let spec of specializations" [value]="spec">{{ spec }}</mat-option>
            </mat-select>
          </mat-form-field>
          
          <mat-form-field appearance="outline" class="filter-field">
            <mat-label>Sort by</mat-label>
            <mat-select [(ngModel)]="sortBy" (selectionChange)="sortDoctors()">
              <mat-option value="name">Name</mat-option>
              <mat-option value="experience">Experience</mat-option>
              <mat-option value="rating">Rating</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>
    </section>

    <!-- Doctors Grid -->
    <section class="doctors-section">
      <div class="container">
        <div class="doctors-grid" *ngIf="filteredDoctors.length > 0">
          <div class="doctor-card" *ngFor="let doctor of filteredDoctors" (click)="viewDoctor(doctor.id)">
            <div class="doctor-image">
              <img [src]="doctor.imageUrl" [alt]="doctor.name" *ngIf="doctor.imageUrl">
              <mat-icon *ngIf="!doctor.imageUrl" class="default-avatar">person</mat-icon>
              <div class="status-badge" [class.active]="doctor.isActive">
                {{ doctor.isActive ? 'Available' : 'Unavailable' }}
              </div>
            </div>
            
            <div class="doctor-info">
              <h3>{{ doctor.name }}</h3>
              <p class="specialization">{{ doctor.specialization }}</p>
              <p class="qualification">{{ doctor.qualification }}</p>
              
              <div class="doctor-stats">
                <div class="stat-item">
                  <mat-icon>work</mat-icon>
                  <span>{{ doctor.experience }} years</span>
                </div>
                <div class="stat-item">
                  <mat-icon>star</mat-icon>
                  <span>{{ doctor.rating }}</span>
                </div>
                <div class="stat-item">
                  <mat-icon>attach_money</mat-icon>
                  <span>\${{ doctor.consultationFee }}</span>
                </div>
              </div>
              
              <div class="rating">
                <mat-icon *ngFor="let star of getStars(doctor.rating)">star</mat-icon>
                <span class="rating-text">{{ doctor.rating }}/5.0</span>
              </div>
              
              <p class="bio">{{ doctor.bio | slice:0:100 }}{{ doctor.bio.length > 100 ? '...' : '' }}</p>
              
              <div class="availability">
                <mat-icon>schedule</mat-icon>
                <span>{{ doctor.availableDays.join(', ') }}</span>
              </div>
              
              <div class="card-actions" style="display:none">
                <button mat-raised-button color="primary" (click)="viewDoctor(doctor.id); $event.stopPropagation()">
                  <mat-icon>visibility</mat-icon>
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- No Results -->
        <div class="no-results" *ngIf="filteredDoctors.length === 0">
          <mat-icon>search_off</mat-icon>
          <h3>No doctors found</h3>
          <p>Try adjusting your search criteria</p>
          <button mat-raised-button color="primary" (click)="clearFilters()">
            Clear Filters
          </button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Can't find what you're looking for?</h2>
          <p>Contact us for personalized assistance</p>
          <div class="cta-buttons">
            <button mat-raised-button color="accent" routerLink="/contact">
              <mat-icon>contact_mail</mat-icon>
              Contact Us
            </button>
            <button mat-stroked-button color="accent" routerLink="/enquiry">
              <mat-icon>help</mat-icon>
              Send Enquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 80px 0;
      text-align: center;
    }
    
    .page-header h1 {
       /*font-size: 3rem;*/
      margin-bottom: 20px;
      font-weight: 300;
    }
    
    .page-header p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .search-section {
      padding: 40px 0;
      background-color: #f8f9fa;
    }
    
    .search-controls {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 20px;
      align-items: end;
    }
    
    .search-field,
    .filter-field {
      width: 100%;
    }
    
    .doctors-section {
      padding: 60px 0;
    }
    
    .doctors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 30px;
    }
    
    .doctor-card {
      background: white;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .doctor-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }
    
    .doctor-image {
      position: relative;
      height: 250px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .doctor-image img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid white;
    }
    
    .default-avatar {
      font-size: 4rem;
      color: white;
    }
    
    .status-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
      background-color: #e74c3c;
      color: white;
    }
    
    .status-badge.active {
      background-color: #27ae60;
    }
    
    .doctor-info {
      padding: 25px;
    }
    
    .doctor-info h3 {
      margin: 0 0 10px 0;
      color: #2c3e50;
      font-size: 1.5rem;
    }
    
    .specialization {
      color: #3498db;
      font-weight: 500;
      margin: 0 0 5px 0;
      font-size: 1.1rem;
    }
    
    .qualification {
      color: #7f8c8d;
      margin: 0 0 15px 0;
      font-size: 0.9rem;
    }
    
    .doctor-stats {
      display: flex;
      justify-content: space-around;
      margin-bottom: 15px;
      padding: 15px 0;
      background-color: #f8f9fa;
      border-radius: 8px;
    }
    
    .stat-item {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .stat-item mat-icon {
      font-size: 1.2rem;
      color: #3498db;
    }
    
    .rating {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 15px;
    }
    
    .rating mat-icon {
      color: #f39c12;
      font-size: 1.2rem;
    }
    
    .rating-text {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .bio {
      color: #7f8c8d;
      line-height: 1.6;
      margin-bottom: 15px;
      font-size: 0.9rem;
    }
    
    .availability {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #7f8c8d;
      margin-bottom: 20px;
      font-size: 0.9rem;
    }
    
    .availability mat-icon {
      color: #3498db;
      font-size: 1.2rem;
    }
    
    .card-actions {
      display: flex;
      gap: 10px;
    }
    
    .card-actions button {
      flex: 1;
      padding: 10px;
      font-size: 0.9rem;
    }
    
    .no-results {
      text-align: center;
      padding: 60px 20px;
    }
    
    .no-results mat-icon {
      font-size: 4rem;
      color: #bdc3c7;
      margin-bottom: 20px;
    }
    
    .no-results h3 {
      color: #2c3e50;
      margin-bottom: 10px;
    }
    
    .no-results p {
      color: #7f8c8d;
      margin-bottom: 30px;
    }
    
    .cta-section {
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
      color: white;
      padding: 60px 0;
      text-align: center;
    }
    
    .cta-content h2 {
      font-size: 2.5rem;
      margin-bottom: 20px;
    }
    
    .cta-content p {
      font-size: 1.2rem;
      margin-bottom: 30px;
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
      .search-controls {
        grid-template-columns: 1fr;
      }
      
      .doctors-grid {
        grid-template-columns: 1fr;
      }
      
      .doctor-stats {
        flex-direction: column;
        gap: 10px;
      }
      
      .card-actions {
        flex-direction: column;
      }
      
      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  searchTerm = '';
  selectedSpecialization = '';
  sortBy = 'name';
  specializations: string[] = [];

  constructor(
    private dataService: DataService,
    private firestore: FirestoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.firestore.getActiveDoctors$().subscribe(docs => {
      this.doctors = docs;
      this.filteredDoctors = [...this.doctors];
      this.extractSpecializations();
    });
  }

  extractSpecializations() {
    this.specializations = [...new Set(this.doctors.map(doctor => doctor.specialization))];
  }

  filterDoctors() {
    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchesSearch = !this.searchTerm || 
        doctor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doctor.qualification.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesSpecialization = !this.selectedSpecialization || 
        doctor.specialization === this.selectedSpecialization;
      
      return matchesSearch && matchesSpecialization;
    });
    
    this.sortDoctors();
  }

  sortDoctors() {
    this.filteredDoctors.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'experience':
          return b.experience - a.experience;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedSpecialization = '';
    this.sortBy = 'name';
    this.filteredDoctors = [...this.doctors];
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  viewDoctor(doctorId: string) {
    this.router.navigate(['/doctors', doctorId]);
  }

  // booking removed per requirements
}
