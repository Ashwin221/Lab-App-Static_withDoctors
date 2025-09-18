import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Scan } from '../../models/scan.model';
import { Doctor } from '../../models/doctor.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-scan-form',
  template: `
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Book Your Scan</h1>
        <p>Schedule your medical scan with our expert doctors</p>
      </div>
    </section>

    <!-- Scan Form -->
    <section class="scan-form-section">
      <div class="container">
        <div class="form-container">
          <form [formGroup]="scanForm" (ngSubmit)="onSubmit()" class="scan-form">
            <mat-stepper #stepper>
              <!-- Step 1: Patient Information -->
              <mat-step [stepControl]="patientInfoGroup">
                <ng-template matStepLabel>Patient Information</ng-template>
                <form [formGroup]="patientInfoGroup">
                  <div class="step-content">
                    <h3>Patient Details</h3>
                    <div class="form-row">
                      <mat-form-field appearance="outline">
                        <mat-label>Full Name</mat-label>
                        <input matInput formControlName="patientName" placeholder="Enter patient's full name">
                        <mat-error *ngIf="patientInfoGroup.get('patientName')?.hasError('required')">
                          Patient name is required
                        </mat-error>
                      </mat-form-field>
                      
                      <mat-form-field appearance="outline">
                        <mat-label>Age</mat-label>
                        <input matInput type="number" formControlName="patientAge" placeholder="Age">
                        <mat-error *ngIf="patientInfoGroup.get('patientAge')?.hasError('required')">
                          Age is required
                        </mat-error>
                      </mat-form-field>
                    </div>
                    
                    <div class="form-row">
                      <mat-form-field appearance="outline">
                        <mat-label>Phone Number</mat-label>
                        <input matInput formControlName="patientPhone" placeholder="+1-555-0123">
                        <mat-error *ngIf="patientInfoGroup.get('patientPhone')?.hasError('required')">
                          Phone number is required
                        </mat-error>
                      </mat-form-field>
                      
                      <mat-form-field appearance="outline">
                        <mat-label>Email</mat-label>
                        <input matInput type="email" formControlName="patientEmail" placeholder="patient@example.com">
                        <mat-error *ngIf="patientInfoGroup.get('patientEmail')?.hasError('required')">
                          Email is required
                        </mat-error>
                        <mat-error *ngIf="patientInfoGroup.get('patientEmail')?.hasError('email')">
                          Please enter a valid email
                        </mat-error>
                      </mat-form-field>
                    </div>
                  </div>
                </form>
              </mat-step>

              <!-- Step 2: Scan Details -->
              <mat-step [stepControl]="scanDetailsGroup">
                <ng-template matStepLabel>Scan Details</ng-template>
                <form [formGroup]="scanDetailsGroup">
                  <div class="step-content">
                    <h3>Scan Information</h3>
                    <div class="form-row">
                      <mat-form-field appearance="outline">
                        <mat-label>Scan Type</mat-label>
                        <mat-select formControlName="scanType">
                          <mat-option *ngFor="let scanType of scanTypes" [value]="scanType.name">
                            {{ scanType.name }} - \${{ scanType.price }}
                          </mat-option>
                        </mat-select>
                        <mat-error *ngIf="scanDetailsGroup.get('scanType')?.hasError('required')">
                          Scan type is required
                        </mat-error>
                      </mat-form-field>
                      
                      <mat-form-field appearance="outline">
                        <mat-label>Preferred Doctor</mat-label>
                        <mat-select formControlName="doctorId">
                          <mat-option value="">Any Available Doctor</mat-option>
                          <mat-option *ngFor="let doctor of doctors" [value]="doctor.id">
                            Dr. {{ doctor.name }} - {{ doctor.specialization }}
                          </mat-option>
                        </mat-select>
                      </mat-form-field>
                    </div>
                    
                    <div class="form-row">
                      <mat-form-field appearance="outline">
                        <mat-label>Preferred Date</mat-label>
                        <input matInput [matDatepicker]="picker" formControlName="scanDate">
                        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                        <mat-datepicker #picker></mat-datepicker>
                        <mat-error *ngIf="scanDetailsGroup.get('scanDate')?.hasError('required')">
                          Scan date is required
                        </mat-error>
                      </mat-form-field>
                      
                      <mat-form-field appearance="outline">
                        <mat-label>Price</mat-label>
                        <input matInput formControlName="price" readonly>
                      </mat-form-field>
                    </div>
                    
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Additional Notes</mat-label>
                      <textarea matInput formControlName="notes" rows="3" placeholder="Any special requirements or notes"></textarea>
                    </mat-form-field>
                  </div>
                </form>
              </mat-step>

              <!-- Step 3: Confirmation -->
              <mat-step>
                <ng-template matStepLabel>Confirmation</ng-template>
                <div class="step-content">
                  <h3>Review Your Booking</h3>
                  <div class="confirmation-details">
                    <div class="detail-section">
                      <h4>Patient Information</h4>
                      <p><strong>Name:</strong> {{ scanForm.get('patientName')?.value }}</p>
                      <p><strong>Age:</strong> {{ scanForm.get('patientAge')?.value }}</p>
                      <p><strong>Phone:</strong> {{ scanForm.get('patientPhone')?.value }}</p>
                      <p><strong>Email:</strong> {{ scanForm.get('patientEmail')?.value }}</p>
                    </div>
                    
                    <div class="detail-section">
                      <h4>Scan Details</h4>
                      <p><strong>Scan Type:</strong> {{ scanForm.get('scanType')?.value }}</p>
                      <p><strong>Doctor:</strong> {{ getSelectedDoctorName() }}</p>
                      <p><strong>Date:</strong> {{ formatDate(scanForm.get('scanDate')?.value) }}</p>
                      <p><strong>Price:</strong> \${{ scanForm.get('price')?.value }}</p>
                    </div>
                    
                    <div class="detail-section" *ngIf="scanForm.get('notes')?.value">
                      <h4>Notes</h4>
                      <p>{{ scanForm.get('notes')?.value }}</p>
                    </div>
                  </div>
                </div>
              </mat-step>
            </mat-stepper>

            <div class="form-actions">
              <button mat-button type="button" (click)="stepper.previous()" [disabled]="stepper.selectedIndex === 0">
                Previous
              </button>
              <button mat-raised-button color="primary" type="button" 
                      (click)="stepper.next()" 
                      [disabled]="!isCurrentStepValid()"
                      *ngIf="stepper.selectedIndex < 2">
                Next
              </button>
              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="scanForm.invalid || isSubmitting"
                      *ngIf="stepper.selectedIndex === 2">
                <mat-icon *ngIf="!isSubmitting">check</mat-icon>
                <mat-spinner *ngIf="isSubmitting" diameter="20"></mat-spinner>
                {{ isSubmitting ? 'Booking...' : 'Confirm Booking' }}
              </button>
            </div>
          </form>
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
      font-size: 3rem;
      margin-bottom: 20px;
      font-weight: 300;
    }
    
    .page-header p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .scan-form-section {
      padding: 60px 0;
    }
    
    .form-container {
      background: white;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .scan-form {
      padding: 30px;
    }
    
    .step-content {
      padding: 20px 0;
    }
    
    .step-content h3 {
      margin: 0 0 30px 0;
      color: #2c3e50;
      font-size: 1.5rem;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .full-width {
      width: 100%;
      margin-bottom: 20px;
    }
    
    .confirmation-details {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    
    .detail-section {
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    
    .detail-section h4 {
      margin: 0 0 15px 0;
      color: #3498db;
      font-size: 1.2rem;
    }
    
    .detail-section p {
      margin: 8px 0;
      color: #2c3e50;
    }
    
    .form-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
    
    .form-actions button {
      padding: 12px 30px;
      font-size: 1rem;
    }
    
    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .form-actions {
        flex-direction: column;
        gap: 15px;
      }
    }
  `]
})
export class ScanFormComponent implements OnInit {
  scanForm: FormGroup;
  patientInfoGroup: FormGroup;
  scanDetailsGroup: FormGroup;
  doctors: Doctor[] = [];
  scanTypes: any[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.patientInfoGroup = this.fb.group({
      patientName: ['', Validators.required],
      patientAge: ['', [Validators.required, Validators.min(1)]],
      patientPhone: ['', Validators.required],
      patientEmail: ['', [Validators.required, Validators.email]]
    });

    this.scanDetailsGroup = this.fb.group({
      scanType: ['', Validators.required],
      doctorId: [''],
      scanDate: ['', Validators.required],
      price: [''],
      notes: ['']
    });

    this.scanForm = this.fb.group({
      patientInfo: this.patientInfoGroup,
      scanDetails: this.scanDetailsGroup
    });
  }

  ngOnInit() {
    this.doctors = this.dataService.getDoctors();
    this.scanTypes = this.dataService.getScanTypes();
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.scanDetailsGroup.patchValue({ scanDate: tomorrow });

    // Watch for scan type changes to update price
    this.scanDetailsGroup.get('scanType')?.valueChanges.subscribe(scanType => {
      const selectedScanType = this.scanTypes.find(st => st.name === scanType);
      if (selectedScanType) {
        this.scanDetailsGroup.patchValue({ price: selectedScanType.price });
      }
    });

    // Check for doctor parameter from URL
    this.route.queryParams.subscribe(params => {
      if (params['doctor']) {
        this.scanDetailsGroup.patchValue({ doctorId: params['doctor'] });
      }
    });
  }

  isCurrentStepValid(): boolean {
    const currentIndex = 0; // This would be dynamic in a real stepper
    if (currentIndex === 0) {
      return this.patientInfoGroup.valid;
    } else if (currentIndex === 1) {
      return this.scanDetailsGroup.valid;
    }
    return true;
  }

  getSelectedDoctorName(): string {
    const doctorId = this.scanDetailsGroup.get('doctorId')?.value;
    if (doctorId) {
      const doctor = this.doctors.find(d => d.id === doctorId);
      return doctor ? `Dr. ${doctor.name}` : 'Any Available Doctor';
    }
    return 'Any Available Doctor';
  }

  formatDate(date: Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }

  onSubmit() {
    if (this.scanForm.valid) {
      this.isSubmitting = true;
      
      const scanData: Scan = {
        id: '',
        patientName: this.patientInfoGroup.value.patientName,
        patientAge: this.patientInfoGroup.value.patientAge,
        patientPhone: this.patientInfoGroup.value.patientPhone,
        patientEmail: this.patientInfoGroup.value.patientEmail,
        scanType: this.scanDetailsGroup.value.scanType,
        scanDate: this.scanDetailsGroup.value.scanDate,
        doctorId: this.scanDetailsGroup.value.doctorId || '',
        doctorName: this.getSelectedDoctorName(),
        status: 'pending',
        price: this.scanDetailsGroup.value.price,
        notes: this.scanDetailsGroup.value.notes,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Simulate API call
      setTimeout(() => {
        this.dataService.addScan(scanData);
        this.isSubmitting = false;
        
        this.snackBar.open('Scan booking confirmed! You will receive a confirmation email shortly.', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        
        this.router.navigate(['/doctors']);
      }, 2000);
    }
  }
}
