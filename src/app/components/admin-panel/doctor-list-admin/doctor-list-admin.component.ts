import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../services/data.service';
import { FirestoreService } from '../../../services/firestore.service';
import { Doctor } from '../../../models/doctor.model';
import { DoctorFormComponent } from '../doctor-form/doctor-form.component';

@Component({
  selector: 'app-doctor-list-admin',
  template: `
    <div class="doctor-list-admin">
      <div class="list-header">
        <h3>Manage Doctors</h3>
        <button mat-raised-button color="primary" (click)="addDoctor()">
          <mat-icon>add</mat-icon>
          Add New Doctor
        </button>
      </div>

      <div class="search-controls">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search doctors</mat-label>
          <input matInput [(ngModel)]="searchTerm" (input)="filterDoctors()" placeholder="Search by name, specialization...">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Status</mat-label>
          <mat-select [(ngModel)]="statusFilter" (selectionChange)="filterDoctors()">
            <mat-option value="">All</mat-option>
            <mat-option value="active">Active</mat-option>
            <mat-option value="inactive">Inactive</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div class="doctors-table-container">
        <table mat-table [dataSource]="filteredDoctors" class="doctors-table">
          <!-- Image Column -->
          <ng-container matColumnDef="image">
            <th mat-header-cell *matHeaderCellDef>Photo</th>
            <td mat-cell *matCellDef="let doctor">
              <div class="doctor-image">
                <img [src]="doctor.imageUrl" [alt]="doctor.name" *ngIf="doctor.imageUrl">
                <mat-icon *ngIf="!doctor.imageUrl" class="default-avatar">person</mat-icon>
              </div>
            </td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let doctor">
              <div class="doctor-name">
                <h4>{{ doctor.name }}</h4>
                <p>{{ doctor.specialization }}</p>
              </div>
            </td>
          </ng-container>

          <!-- Contact Column -->
          <ng-container matColumnDef="contact">
            <th mat-header-cell *matHeaderCellDef>Contact</th>
            <td mat-cell *matCellDef="let doctor">
              <div class="contact-info">
                <p><mat-icon>email</mat-icon> {{ doctor.email }}</p>
                <p><mat-icon>phone</mat-icon> {{ doctor.phone }}</p>
              </div>
            </td>
          </ng-container>

          <!-- Experience Column -->
          <ng-container matColumnDef="experience">
            <th mat-header-cell *matHeaderCellDef>Experience</th>
            <td mat-cell *matCellDef="let doctor">
              <div class="experience-info">
                <span class="years">{{ doctor.experience }} years</span>
                <div class="rating">
                  <mat-icon *ngFor="let star of getStars(doctor.rating)">star</mat-icon>
                  <span>{{ doctor.rating }}</span>
                </div>
              </div>
            </td>
          </ng-container>

          <!-- Fee Column -->
          <ng-container matColumnDef="fee">
            <th mat-header-cell *matHeaderCellDef>Consultation Fee</th>
            <td mat-cell *matCellDef="let doctor">
              <span class="fee">\${{ doctor.consultationFee }}</span>
            </td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let doctor">
              <span class="status-badge" [class.active]="doctor.isActive">
                {{ doctor.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let doctor">
              <div class="action-buttons">
                <button mat-icon-button (click)="editDoctor(doctor)" matTooltip="Edit">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button (click)="toggleStatus(doctor)" 
                        [matTooltip]="doctor.isActive ? 'Deactivate' : 'Activate'">
                  <mat-icon>{{ doctor.isActive ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
                <button mat-icon-button (click)="deleteDoctor(doctor)" matTooltip="Delete" color="warn">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <!-- No Data -->
        <div class="no-data" *ngIf="filteredDoctors.length === 0">
          <mat-icon>people_outline</mat-icon>
          <h3>No doctors found</h3>
          <p>Try adjusting your search criteria or add a new doctor</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .doctor-list-admin {
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 25px 30px;
      border-bottom: 1px solid #e0e0e0;
      background: #f8f9fa;
    }
    
    .list-header h3 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.5rem;
    }
    
    .search-controls {
      display: flex;
      gap: 20px;
      padding: 20px 30px;
      background: #f8f9fa;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .search-field {
      flex: 2;
    }
    
    .filter-field {
      flex: 1;
    }
    
    .doctors-table-container {
      overflow-x: auto;
    }
    
    .doctors-table {
      width: 100%;
    }
    
    .doctors-table th {
      background-color: #f8f9fa;
      color: #2c3e50;
      font-weight: 600;
    }
    
    .doctors-table td {
      border-bottom: 1px solid #e0e0e0;
    }
    
    .doctor-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      background-color: #ecf0f1;
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
      color: #bdc3c7;
      font-size: 1.5rem;
    }
    
    .doctor-name h4 {
      margin: 0 0 5px 0;
      color: #2c3e50;
      font-size: 1rem;
    }
    
    .doctor-name p {
      margin: 0;
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .contact-info p {
      margin: 5px 0;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .contact-info mat-icon {
      font-size: 1rem;
      color: #3498db;
    }
    
    .experience-info {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    
    .years {
      color: #2c3e50;
      font-weight: 500;
    }
    
    .rating {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    
    .rating mat-icon {
      color: #f39c12;
      font-size: 1rem;
    }
    
    .rating span {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
    
    .fee {
      color: #27ae60;
      font-weight: 500;
      font-size: 1.1rem;
    }
    
    .status-badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
      background-color: #e74c3c;
      color: white;
    }
    
    .status-badge.active {
      background-color: #27ae60;
    }
    
    .action-buttons {
      display: flex;
      gap: 5px;
    }
    
    .action-buttons button {
      width: 36px;
      height: 36px;
    }
    
    .no-data {
      text-align: center;
      padding: 60px 20px;
      color: #7f8c8d;
    }
    
    .no-data mat-icon {
      font-size: 4rem;
      color: #bdc3c7;
      margin-bottom: 20px;
    }
    
    .no-data h3 {
      margin: 0 0 10px 0;
      color: #2c3e50;
    }
    
    .no-data p {
      margin: 0;
    }
    
    @media (max-width: 768px) {
      .search-controls {
        flex-direction: column;
      }
      
      .list-header {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
      }
    }
  `]
})
export class DoctorListAdminComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  searchTerm = '';
  statusFilter = '';
  displayedColumns = ['image', 'name', 'contact', 'experience', 'fee', 'status', 'actions'];

  constructor(
    private dataService: DataService,
    private firestore: FirestoreService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.firestore.getAllDoctors$().subscribe(list => {
      this.doctors = list;
      this.filteredDoctors = [...this.doctors];
    });
  }

  filterDoctors() {
    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchesSearch = !this.searchTerm || 
        doctor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || 
        (this.statusFilter === 'active' && doctor.isActive) ||
        (this.statusFilter === 'inactive' && !doctor.isActive);
      
      return matchesSearch && matchesStatus;
    });
  }

  addDoctor() {
    console.log('Opening doctor form dialog...');
    const dialogRef = this.dialog.open(DoctorFormComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: { doctor: null, isEditMode: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result) {
        console.log('Adding doctor to Firestore:', result);
        this.firestore.addDoctor(result).then(() => {
          console.log('Doctor added successfully, refreshing list');
          this.loadDoctors(); // Use loadDoctors instead of filterDoctors to refresh from Firestore
        }).catch(error => {
          console.error('Error adding doctor:', error);
        });
      } else {
        console.log('Dialog was cancelled or closed without data');
      }
    });
  }

  editDoctor(doctor: Doctor) {
    const dialogRef = this.dialog.open(DoctorFormComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: { doctor: doctor, isEditMode: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.firestore.updateDoctor(result).then(() => {
          this.filterDoctors();
        });
      }
    });
  }

  toggleStatus(doctor: Doctor) {
    const updatedDoctor = { ...doctor, isActive: !doctor.isActive };
    this.firestore.updateDoctor(updatedDoctor).then(() => this.filterDoctors());
  }

  deleteDoctor(doctor: Doctor) {
    if (confirm(`Are you sure you want to delete Dr. ${doctor.name}?`)) {
      this.firestore.deleteDoctor(doctor.id).then(() => this.filterDoctors());
    }
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
